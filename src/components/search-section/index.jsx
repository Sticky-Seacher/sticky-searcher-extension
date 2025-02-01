import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { convertToLinkMap } from "../../../background/convertToLinkMap";
import TextButton from "../shared/TextButton";
import { KeywordGroup } from "./KeywordGroup";
import { SearchSectionInput } from "./SearchSectionInput";
import { ToggleableAllKeywordsButton } from "./ToggleableAllKeywordsButton";

export default function SearchSection({
  countsPerKeywords,
  setCountsPerKeywords,
}) {
  const [isKeywordOn, setIsKeywordOn] = useState(false);
  const [keywordsForSearch, setKeywordsForSearch] = useState([]);
  const [bonus, setBonus] = useState([]);
  const [toggleStatus, setToggleStatus] = useState([]);

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

  useEffect(() => {
    async function makeCountsPerKeywords(group) {
      if (group.length > 0) {
        const tabs = await chrome.tabs.query({
          currentWindow: true,
          active: true,
        });
        const activeTab = tabs[0];
        const response = await chrome.tabs.sendMessage(activeTab.id, {
          keywords: group,
        });

        setCountsPerKeywords(response);
        setToggleStatus((prev) => {
          const currentKeywords = response.map(({ keyword }) => keyword);
          const prevKeywords = prev.map(({ keyword }) => keyword);

          const newKeywords = currentKeywords.filter(
            (keyword) => !prevKeywords.includes(keyword)
          );
          const newToggleStatus = newKeywords.map((keyword) => ({
            keyword,
            isOn: true,
          }));

          const notDeletedPrevToggleStatus = prev.filter(({ keyword }) =>
            currentKeywords.includes(keyword)
          );
          return [...notDeletedPrevToggleStatus, ...newToggleStatus];
        });
      }
    }

    makeCountsPerKeywords([...bonus, ...keywordsForSearch]);
  }, [bonus, keywordsForSearch, setCountsPerKeywords]);

  async function fireSearch() {
    const allInOneLinkMap = await collectAllLinkMap();
    const detectedKeywordsByGoogle = [];

    const { url } = await getActiveTab();

    const link = url.includes("#:~:text=")
      ? url.substring(0, url.indexOf("#:~:text="))
      : url;

    if (allInOneLinkMap.has(link)) {
      const { keywords } = allInOneLinkMap.get(link);
      detectedKeywordsByGoogle.push(...keywords);
    }

    return detectedKeywordsByGoogle;
  }

  async function handleKeywordTextButtonClick(isKeywordOn) {
    const nextIsKeywordOn = !isKeywordOn;

    setIsKeywordOn(nextIsKeywordOn);

    if (nextIsKeywordOn) {
      const detectedKeywordsByGoogle = await fireSearch();
      setKeywordsForSearch([...detectedKeywordsByGoogle]);
    }
  }

  function handleKeywordDelete(keyword) {
    setBonus((prev) => prev.filter((b) => b !== keyword));
    setKeywordsForSearch((prev) => prev.filter((k) => k !== keyword));
  }

  function toggleAllKeywordsIsOn(nextIsOn) {
    setToggleStatus((prev) =>
      prev.map(({ keyword }) => ({ keyword, isOn: nextIsOn }))
    );
  }

  return (
    <>
      <SearchSectionInput
        key={countsPerKeywords[0] ? countsPerKeywords[0].keyword : "default"}
        handleEnter={(value) => {
          setBonus((prv) => [value, ...prv]);
        }}
        countsPerKeywords={countsPerKeywords}
      />
      <div className="flex gap-[15px]">
        <TextButton
          text={"Start Searcher"}
          onClick={() => handleKeywordTextButtonClick(isKeywordOn)}
        />
        <ToggleableAllKeywordsButton
          toggleStatus={toggleStatus}
          toggleAllKeywordsIsOn={toggleAllKeywordsIsOn}
        />
      </div>
      <KeywordGroup
        toggleStatus={toggleStatus}
        setToggleStatus={setToggleStatus}
        handleDelete={handleKeywordDelete}
      />
    </>
  );
}

SearchSection.propTypes = {
  countsPerKeywords: PropTypes.array.isRequired,
  setCountsPerKeywords: PropTypes.func.isRequired,
};
