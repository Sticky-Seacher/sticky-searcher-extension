import PropTypes from "prop-types";
import { useState } from "react";

import { ToggleableTextButton } from "../shared/TextButton";

export function ToggleableKeywordButton({ keyword }) {
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

ToggleableKeywordButton.propTypes = {
  keyword: PropTypes.string,
};
