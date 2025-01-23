import PropTypes from "prop-types";
import { useState } from "react";

import { ToggleableTextButton } from "../shared/TextButton";

function ToggleableKeywordButton({ keyword }) {
  const [isOn, setIsOn] = useState(true);

  async function handleClick(isOn) {
    const nextIsOn = !isOn;

    setIsOn(nextIsOn);

    const tabs = await chrome.tabs.query({
      currentWindow: true,
      active: true,
    });
    const activeTab = tabs[0];
    await chrome.tabs.sendMessage(activeTab.id, {
      message: "toggle-highlight",
      toggleIsOn: nextIsOn,
      targetKeyword: keyword,
    });
  }

  return (
    <ToggleableTextButton
      onClick={() => handleClick(isOn)}
      text={keyword}
      isOn={isOn}
    />
  );
}

export function KeywordGroup({ countsPerKeywords, handleDelete }) {
  const existingKeywords = countsPerKeywords.map(({ keyword }) => keyword);

  return (
    <>
      <div>
        <p className="text-lg font-semibold mt-[10px] mb-[10px]">
          Keyword Group
        </p>
        <ul className="bg-[#f6f6f6] h-60 overflow-y-scroll border text-center grid grid-cols-3 gap-[15px] px-[10px] py-[20px]">
          {existingKeywords.map((keyword) => {
            return (
              <li
                key={keyword}
                className="text-xs py-[10px]"
              >
                <ToggleableKeywordButton keyword={keyword} />
                <button
                  onClick={() => handleDelete(keyword)}
                  className="px-1"
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

KeywordGroup.propTypes = {
  countsPerKeywords: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

ToggleableKeywordButton.propTypes = {
  keyword: PropTypes.string.isRequired,
};
