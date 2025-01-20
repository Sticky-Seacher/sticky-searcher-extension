import { reviver } from "../content-script/mapToJosn";

export function convertToLinkMap(storageData) {
  const linkMap = JSON.parse(storageData, reviver);

  return linkMap;
}
