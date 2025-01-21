import { reviver } from "../content-script/mapToJosn";

export function convertToLinkMap(storageData) {
  if (typeof storageData !== "string") {
    throw TypeError("storageData에는 string을 제공해 주세요.");
  }
  const linkMap = JSON.parse(storageData, reviver);

  return linkMap;
}
