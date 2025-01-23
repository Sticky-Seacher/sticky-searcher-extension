import PropTypes from "prop-types";
import { useState } from "react";

import { ToggleableTextButton } from "../shared/TextButton";

export function ToggleableKeywordButton({ keyword, isAll, countsPerKeywords }) {
  if (isAll && !Array.isArray(countsPerKeywords)) {
    throw Error(
      "isAll을 true로 제공한 경우, countsPerKeywords을 필수로 제공해 주세요."
    );
  }
  if (!isAll && typeof keyword !== "string") {
    throw Error("isAll을 false로 제공한 경우, keyword을 필수로 제공해 주세요.");
  }

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

  async function handleClickAll(isOn) {
    const nextIsOn = !isOn;

    setIsOn(nextIsOn);

    const tabs = await chrome.tabs.query({
      currentWindow: true,
      active: true,
    });
    const activeTab = tabs[0];
    await chrome.tabs.sendMessage(activeTab.id, {
      message: "toggle-highlight-all",
      toggleIsOn: nextIsOn,
      targetKeywords: countsPerKeywords.map(({ keyword }) => keyword),
    });
  }

  return (
    <ToggleableTextButton
      onClick={isAll ? () => handleClickAll(isOn) : () => handleClick(isOn)}
      text={isAll ? "Highlight All Keywords" : keyword}
      isOn={isOn}
    />
  );
}

ToggleableKeywordButton.propTypes = {
  keyword: PropTypes.string,
  isAll: PropTypes.bool.isRequired,
  countsPerKeywords: PropTypes.array,
};
