import getLeafTargetElements from "./getLeafTargetElements";
import { getSearchKeywords } from "./getSearchKeywords";
import { highlightKeywords } from "./highlight";
import { setHighlight } from "./highlight";
import { SELECTOR, getDescriptionElements, setLinkMap } from "./linkMap";
import { replacer } from "./mapToJosn";
import {
  applyHighlight,
  applyHighlightAll,
  turnOffHighlight,
  turnOffHighlightAll,
} from "./toggle";

const BACKGROUND_COLORS = [
  "#dac8ff",
  "#CFF09E",
  "#A8DBA8",
  "#D7FFF1",
  "#ffdb9d",
  "#DDDDDD",
  "#FADAD8",
  "#b0dcff",
];

function highlightKeywordsWithColors(
  keywordColorPairs,
  rootElement,
  getTargetElements
) {
  const elements = getTargetElements(rootElement);
  const uniqueElements = new Set(elements);

  for (const { keyword, color } of keywordColorPairs) {
    for (const el of uniqueElements) {
      if (el.textContent.includes(keyword)) {
        setHighlight(keyword, el, color);
      }
    }
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request === "give-me-linkMap") {
    const descriptionElements = getDescriptionElements(SELECTOR);
    const keywords = getSearchKeywords();
    const linkMap = setLinkMap(descriptionElements, keywords);
    const mapJson = JSON.stringify(linkMap, replacer);

    highlightKeywords(
      keywords,
      document.body,
      getLeafTargetElements,
      BACKGROUND_COLORS
    );

    sendResponse(mapJson);
    return true;
  }

  if (request.keywords) {
    const isColorStructured =
      typeof request.keywords[0] === "object" &&
      "keyword" in request.keywords[0];

    if (isColorStructured) {
      const newKeywordColorPairs = request.keywords.filter(
        ({ keyword }) =>
          !document.querySelector(`[data-highlight="${keyword}"]`)
      );

      highlightKeywordsWithColors(
        newKeywordColorPairs,
        document.body,
        getLeafTargetElements
      );

      const result = request.keywords.map(({ keyword }) => ({
        keyword,
        count: document.querySelectorAll(`[data-highlight="${keyword}"]`)
          .length,
      }));

      sendResponse(result);
      return true;
    } else {
      const newKeywords = request.keywords.filter(
        (keyword) => !document.querySelector(`[data-highlight="${keyword}"]`)
      );

      highlightKeywords(
        newKeywords,
        document.body,
        getLeafTargetElements,
        BACKGROUND_COLORS
      );

      const result = request.keywords.map((keyword) => ({
        keyword,
        count: document.querySelectorAll(`[data-highlight="${keyword}"]`)
          .length,
      }));

      sendResponse(result);
      return true;
    }
  }

  if (request.step) {
    const result = scroll(
      request.step,
      request.currentScrollIndex,
      request.keyword
    );
    sendResponse(result);
    return true;
  }

  if (request.message === "toggle-highlight") {
    const color = request.color || BACKGROUND_COLORS;
    if (request.isHighlightOn) {
      applyHighlight(request.targetKeyword, color);
    } else {
      turnOffHighlight(request.targetKeyword);
    }
    return true;
  }

  if (request.message === "toggle-highlight-all") {
    if (request.isHighlightOn) {
      applyHighlightAll(request.targetKeywords);
    } else {
      turnOffHighlightAll();
    }
    return true;
  }
});

let defaultStyle = "";
const UPDATED_STYLE = "background: rgb(76, 168, 128)";

function scroll(step, currentScrollIndex, keyword) {
  const keywordElements = Array.from(
    document.querySelectorAll(`[data-highlight="${keyword}"]`)
  );

  if (currentScrollIndex === -1) {
    defaultStyle = keywordElements?.style.cssText || "";
  }

  if (
    currentScrollIndex + step > keywordElements.length - 1 ||
    currentScrollIndex + step < 0
  ) {
    return { isDone: false, message: "바운데리 값입니다." };
  }

  keywordElements[currentScrollIndex + step].scrollIntoView({
    behavior: "instant",
    block: "center",
  });

  keywordElements[currentScrollIndex + step].style = UPDATED_STYLE;
  if (currentScrollIndex !== -1) {
    keywordElements[currentScrollIndex].style = defaultStyle;
  }

  return { isDone: true, newIndex: currentScrollIndex + step };
}

const userEmail = localStorage.getItem("userEmail");
const userAccessToken = localStorage.getItem("userAccessToken");

userEmail &&
  userAccessToken &&
  chrome.runtime.sendMessage({
    message: "Get user authentication",
    emailData: userEmail,
    tokenData: userAccessToken,
  });
