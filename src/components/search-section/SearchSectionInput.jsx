import PropTypes from "prop-types";
import { useState } from "react";

function Indicator({ currentScrollIndex, countsPerKeywords }) {
  return (
    <span className="text-[#ccc] font-extralight leading-[50px]">
      {`${currentScrollIndex === -1 ? 0 : currentScrollIndex + 1}/${countsPerKeywords[0] ? countsPerKeywords[0].count : 0}`}
    </span>
  );
}

export function SearchSectionInput({ handleEnter, countsPerKeywords }) {
  const [currentScrollIndex, setCurrentScrollIndex] = useState(-1);
  const [value, setValue] = useState(
    countsPerKeywords[0] ? countsPerKeywords[0].keyword : ""
  );
  const [isShowing, setIsShowing] = useState(
    countsPerKeywords[0] ? true : false
  );

  async function handleArrowClick(direction) {
    const existingKeywords = countsPerKeywords.map(({ keyword }) => keyword);

    if (!existingKeywords.includes(value)) {
      return;
    }

    const tabs = await chrome.tabs.query({ currentWindow: true, active: true });

    const activeTab = tabs[0];
    const response = await chrome.tabs.sendMessage(activeTab.id, {
      step: direction === "next" ? 1 : -1,
      currentScrollIndex,
      keyword: value,
    });

    if (response.isDone) {
      setCurrentScrollIndex(response.newIndex);
    }
  }

  return (
    <>
      <input
        type="text"
        className="w-full h-[50px] border border-[100] pl-[20px] my-[30px] text-[#333] rounded-full"
        placeholder="키워드를 입력해 주세요"
        value={value}
        onChange={(event) => {
          setIsShowing(false);
          setValue(event.target.value);
        }}
        onKeyDown={(event) => {
          const existingKeywords = countsPerKeywords.map(
            ({ keyword }) => keyword
          );

          if (event.key === "Enter" && !existingKeywords.includes(value)) {
            handleEnter(value);
          }
        }}
      />
      <div className="buttonWrap absolute top-[90px] right-[20px] h-[50px] flex gap-[15px]">
        {isShowing && (
          <Indicator
            currentScrollIndex={currentScrollIndex}
            countsPerKeywords={countsPerKeywords}
          />
        )}
        <button onClick={() => handleArrowClick("prev")}>↑</button>
        <button onClick={() => handleArrowClick("next")}>↓</button>
        <button
          onClick={() => {
            const existingKeywords = countsPerKeywords.map(
              ({ keyword }) => keyword
            );

            if (!existingKeywords.includes(value)) {
              handleEnter(value);
            }
          }}
          className="w-[40px] h-full flex justify-center items-center rounded-r-full"
        >
          <img
            src="./search_icon.png"
            alt="search_icon"
            className="w-[25px]"
          />
        </button>
      </div>
    </>
  );
}

Indicator.propTypes = {
  currentScrollIndex: PropTypes.number.isRequired,
  countsPerKeywords: PropTypes.array.isRequired,
};

SearchSectionInput.propTypes = {
  handleEnter: PropTypes.func.isRequired,
  countsPerKeywords: PropTypes.array.isRequired,
};
