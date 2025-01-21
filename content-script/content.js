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
  }

  if (request.keywords) {
    highlightKeywords(request.keywords, document.body, getLeafTargetElements);
  }

  if (request.goto) {
    scroll(request.goto, request.currentScrollIndex, request.keyword);
  }
});

function scroll(goto, currentScrollIndex, keyword) {
  const keywordElements = Array.from(
    document.querySelectorAll(`[data-highlight="${keyword}"]`)
  );
  keywordElements[currentScrollIndex + goto].scrollIntoView({
    behavior: "instant",
    block: "center",
  });
  keywordElements[currentScrollIndex + goto].style = `background:yellow`;
}
