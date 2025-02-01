import PropTypes from "prop-types";
import { useState } from "react";

import { ToggleableTextButton } from "../shared/TextButton";

export function ToggleableAllKeywordsButton({
  toggleStatus,
  toggleAllKeywordsIsOn,
}) {
  const [isOn, setIsOn] = useState(true);

  const onCount = toggleStatus.filter(({ isOn }) => isOn === true).length;
  const offCount = toggleStatus.filter(({ isOn }) => isOn === false).length;

  const wouldChange = (isOn && onCount === 0) || (!isOn && offCount === 0);

  if (toggleStatus.length !== 0 && wouldChange) {
    setIsOn(!isOn);
  }

  async function handleClickAll(isOn) {
    const nextIsOn = !isOn;

    setIsOn(nextIsOn);
    toggleAllKeywordsIsOn(nextIsOn);

    const tabs = await chrome.tabs.query({
      currentWindow: true,
      active: true,
    });
    const activeTab = tabs[0];
    await chrome.tabs.sendMessage(activeTab.id, {
      message: "toggle-highlight-all",
      isHighlightOn: nextIsOn,
      targetKeywords: toggleStatus.map(({ keyword }) => keyword),
    });
  }

  return (
    <ToggleableTextButton
      onClick={() => handleClickAll(isOn)}
      text={"Highlight All Keywords"}
      isOn={isOn}
    />
  );
}

ToggleableAllKeywordsButton.propTypes = {
  toggleStatus: PropTypes.array.isRequired,
  toggleAllKeywordsIsOn: PropTypes.func.isRequired,
};
