import getLeafTargetElements from "./getLeafTargetElements";
import { highlightKeywords } from "./highlight";

highlightKeywords(["async"], document.body, getLeafTargetElements);
