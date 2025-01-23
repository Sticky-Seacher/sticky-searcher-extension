import getLeafTargetElements from "./getLeafTargetElements";
import { getSearchKeywords } from "./getSearchKeywords";
import { highlightKeywords, makeRandomBackgroundColor } from "./highlight";
import { SELECTOR, getDescriptionElements, setLinkMap } from "./linkMap";
import { replacer } from "./mapToJosn";
import {
  applyHighlight,
  applyHighlightAll,
  turnOffHighlight,
  turnOffHighlightAll,
} from "./toggle";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request === "give-me-linkMap") {
    const descriptionElements = getDescriptionElements(SELECTOR);
    const keywords = getSearchKeywords();
    const linkMap = setLinkMap(descriptionElements, keywords);
    const mapJson = JSON.stringify(linkMap, replacer);

    highlightKeywords(keywords, document.body, getLeafTargetElements);

    sendResponse(mapJson);

    return true;
  }

  if (request.keywords) {
    const newKeywords = request.keywords.filter(
      (keyword) => !document.querySelector(`[data-highlight="${keyword}"]`)
    );

    highlightKeywords(newKeywords, document.body, getLeafTargetElements);

    const result = request.keywords.map((keyword) => {
      return {
        keyword,
        count: document.querySelectorAll(`[data-highlight="${keyword}"]`)
          .length,
      };
    });

    sendResponse(result);

    return true;
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
    if (request.toggleIsOn) {
      applyHighlight(request.targetKeyword, makeRandomBackgroundColor());
    } else {
      turnOffHighlight(request.targetKeyword);
    }

    return true;
  }

  if (request.message === "toggle-highlight-all") {
    if (request.toggleIsOn) {
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
    defaultStyle = keywordElements[0].style.cssText;
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
