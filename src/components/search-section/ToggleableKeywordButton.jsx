import PropTypes from "prop-types";

import { ToggleableTextButton } from "../shared/TextButton";

export function ToggleableKeywordButton({ keyword, isOn, toggleKeywordIsOn }) {
  async function handleClick(isOn) {
    const nextIsOn = !isOn;

    toggleKeywordIsOn();

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
  isOn: PropTypes.bool.isRequired,
  toggleKeywordIsOn: PropTypes.func.isRequired,
};
