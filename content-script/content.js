import getLeafTargetElements from "./getLeafTargetElements";
import { getSearchKeywords } from "./getSearchKeywords";
import { highlightKeywords } from "./highlight";
import { SELECTOR, getDescriptionElements, setLinkMap } from "./linkMap";
import { replacer } from "./mapToJosn";

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
    highlightKeywords(request.keywords, document.body, getLeafTargetElements);
  }

  if (request.message === "get-keyword-element-total-count") {
    sendResponse({
      totalCount: document.querySelectorAll(
        `[data-highlight="${request.keyword}"]`
      ).length,
    });

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
