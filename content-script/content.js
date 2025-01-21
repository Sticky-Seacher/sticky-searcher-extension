import getLeafTargetElements from "./getLeafTargetElements";
import { getSearchKeywords } from "./getSearchKeywords";
import { highlightKeywords } from "./highlight";
import { SELECTOR, getDescriptionElements, setLinkMap } from "./linkMap";
import { replacer } from "./mapToJosn";

const keywords = getSearchKeywords();

highlightKeywords(keywords, document.body, getLeafTargetElements);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const descriptionElements = getDescriptionElements(SELECTOR);
  const linkMap = setLinkMap(descriptionElements, keywords);

  if (request === "give-me-linkMap") {
    const mapJson = JSON.stringify(linkMap, replacer);
    sendResponse(mapJson);
  }
});
