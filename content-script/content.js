import getLeafTargetElements from "./getLeafTargetElements";
import { getSearchKeywords } from "./getSearchKeywords";
import { highlightKeywords } from "./highlight";

const keywords = getSearchKeywords();

highlightKeywords(keywords, document.body, getLeafTargetElements);
