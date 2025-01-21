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

    sendResponse(mapJson);

    return true;
  }

  if (request.keywords) {
    highlightKeywords(request.keywords, document.body, getLeafTargetElements);
  }

  if (request.init) {
    const result = scroll(0, 0, request.keyword);

    sendResponse(result);

    return true;
  }

  if (request.goto) {
    const result = scroll(
      request.goto,
      request.currentScrollIndex,
      request.keyword
    );

    sendResponse(result);

    return true;
  }
});

let defaultStyle = "";
const UPDATED_STYLE = "background: yellow";

function scroll(goto, currentScrollIndex, keyword) {
  const keywordElements = Array.from(
    document.querySelectorAll(`[data-highlight="${keyword}"]`)
  );

  if (
    currentScrollIndex + goto > keywordElements.length - 1 ||
    currentScrollIndex + goto < 0
  ) {
    return { isDone: false, message: "바운데리 값입니다." };
  }

  if (goto === 0) {
    defaultStyle = keywordElements[0].style.cssText;
    keywordElements[0].scrollIntoView({
      behavior: "instant",
      block: "center",
    });
    keywordElements[0].style = UPDATED_STYLE;

    return { isDone: true };
  }

  keywordElements[currentScrollIndex + goto].scrollIntoView({
    behavior: "instant",
    block: "center",
  });
  keywordElements[currentScrollIndex + goto].style = UPDATED_STYLE;
  keywordElements[currentScrollIndex].style = defaultStyle;

  return { isDone: true };
}
