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

  keywordElements[currentScrollIndex + goto].scrollIntoView({
    behavior: "instant",
    block: "center",
  });
  keywordElements[currentScrollIndex + goto].style = `background:yellow`;

  return { isDone: true };
}
