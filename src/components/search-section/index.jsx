import { useState } from "react";

import { convertToLinkMap } from "../../../background/convertToLinkMap";
import TextButton from "../shared/TextButton";
import { KeywordGroup } from "./KetwordGroup";
import { SearchSectionInput } from "./SearchSectionInput";

export default function SearchSection() {
  const [isKeywordOn, setIsKeywordOn] = useState(false);
  const [keywords, setKeywords] = useState([]);

  async function handleKeywordClick() {
    setIsKeywordOn(!isKeywordOn);
    if (!isKeywordOn) {
      const data = await chrome.storage.local.get(null);
      const linkMapJsons = Object.values(data);
      const linkMap = convertToLinkMap(linkMapJsons[0]);
      const mapIterator = linkMap.values();
      for (const { keywords } of mapIterator) {
        setKeywords(keywords);

        break;
      }
    }
  }

  if (keywords.length > 0) {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { keywords });
    });
  }

  return (
    <>
      <SearchSectionInput />
      <div className="flex gap-[15px]">
        <TextButton text={"Descrition"} />
        <TextButton
          text={"keyword"}
          onClick={() => handleKeywordClick()}
        />
      </div>
      <KeywordGroup />
    </>
  );
}
