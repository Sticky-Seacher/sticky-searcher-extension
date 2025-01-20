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
    console.log("키워드 받음", request.keywords);
    highlightKeywords(request.keywords, document.body, getLeafTargetElements);
  }

  if (request.goto === "next") {
    start(request.goto);
  }

  if (request.goto === "prev") {
    start(request.goto);
  }
});

function start(goto) {
  console.log(`${goto} 작동`);
}
