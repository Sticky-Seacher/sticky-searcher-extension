import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export function SearchSectionInput({ currentKeyword, handleEnter, group }) {
  const [currentScrollIndex, setCurrentScrollIndex] = useState(-1);
  const [value, setValue] = useState(currentKeyword);
  const [totalCount, setTotalCount] = useState(0);

  async function handleArrowClick(direction) {
    const tabs = await chrome.tabs.query({ currentWindow: true, active: true });

    const activeTab = tabs[0];
    const response = await chrome.tabs.sendMessage(activeTab.id, {
      step: direction === "next" ? 1 : -1,
      currentScrollIndex,
      keyword: currentKeyword,
    });

    if (response.isDone) {
      setCurrentScrollIndex(response.newIndex);
    }
  }

  useEffect(() => {
    async function getKeywordElementTotalCount(keywordInInput) {
      const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true,
      });
      const activeTab = tabs[0];
      const response = await chrome.tabs.sendMessage(activeTab.id, {
        message: "get-keyword-element-total-count",
        keyword: keywordInInput,
      });

      setTotalCount(response.totalCount);
    }
    getKeywordElementTotalCount(currentKeyword);
  }, [currentKeyword]);

  const indicator = `${currentScrollIndex}/${totalCount}`;

  return (
    <>
      <input
        type="text"
        className="w-full h-[50px] border border-[100] pl-[20px] my-[30px] text-[#333] rounded-full"
        placeholder="키워드를 입력해 주세요"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !group.includes(value)) {
            handleEnter(value);
          }
        }}
      />
      <div className="buttonWrap absolute top-[75px] right-0 h-[50px] flex gap-[15px]">
        <span className="text-[#ccc] font-extralight leading-[50px]">
          {currentScrollIndex === -1 ? "" : indicator}
        </span>
        <button onClick={() => handleArrowClick("prev")}>↑</button>
        <button onClick={() => handleArrowClick("next")}>↓</button>
        <button
          onClick={() => handleEnter(value)}
          className="bg-[#333] w-[70px] h-full flex justify-center items-center rounded-r-full"
        >
          <img
            src="./search_icon.png"
            alt="search_icon"
            className="w-[30px]"
          />
        </button>
      </div>
    </>
  );
}

SearchSectionInput.propTypes = {
  currentKeyword: PropTypes.string.isRequired,
  handleEnter: PropTypes.func.isRequired,
  group: PropTypes.array.isRequired,
};
