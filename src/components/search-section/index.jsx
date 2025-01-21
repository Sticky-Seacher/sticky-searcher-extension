import { useState } from "react";

import { convertToLinkMap } from "../../../background/convertToLinkMap";
import TextButton from "../shared/TextButton";
import { KeywordGroup } from "./KetwordGroup";
import { SearchSectionInput } from "./SearchSectionInput";

export default function SearchSection() {
  const [isKeywordOn, setIsKeywordOn] = useState(false);
  const [keywordsForSearch, setKeywordsForSearch] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState("");

  async function collectAllLinkMap() {
    const tabIdToLinkMapJson = await chrome.storage.local.get(null);
    const AllLinkMapJsons = Object.values(tabIdToLinkMapJson);

    const allInOneLinkMap = new Map();

    AllLinkMapJsons.forEach((linkMapJson) => {
      const linkMap = convertToLinkMap(linkMapJson);
      for (const [link, { description, keywords }] of linkMap) {
        allInOneLinkMap.set(link, { description, keywords });
      }
    });

    return allInOneLinkMap;
  }

  async function getActiveTab() {
    const tabs = await chrome.tabs.query({ currentWindow: true, active: true });

    const activeTab = tabs[0];

    return activeTab;
  }

  async function handleKeywordClick() {
    setIsKeywordOn(!isKeywordOn);
    if (!isKeywordOn) {
      const allInOneLinkMap = await collectAllLinkMap();

      const { url } = await getActiveTab();

      const link = url.includes("#:~:text=")
        ? url.substring(0, url.indexOf("#:~:text="))
        : url;

      if (allInOneLinkMap.has(link)) {
        const { keywords } = allInOneLinkMap.get(link);
        setCurrentKeyword(keywords[0]);
        setKeywordsForSearch([...keywords]);
      }
    }
  }

  if (keywordsForSearch.length > 0) {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { keywords: keywordsForSearch });
    });
  }

  return (
    <>
      <SearchSectionInput
        key={currentKeyword}
        currentKeyword={currentKeyword}
      />
      <div className="flex gap-[15px]">
        <TextButton text={"Descrition"} />
        <TextButton
          text={"keyword"}
          onClick={() => handleKeywordClick()}
        />
      </div>
      <KeywordGroup
        currentKeyword={currentKeyword}
        keywords={keywordsForSearch}
      />
    </>
  );
}
