import PropTypes from "prop-types";

import { useUserInfo } from "../../context/UserInfo";
import {
  addHistoryToDefaultGroup,
  getHistoriesInDefaultGroup,
} from "../../firebase/history";
import { addNewUserAndDefaultGroup, getUser } from "../../firebase/user";
import IconButton from "../shared/IconButton";

export default function HistorySection({ countsPerKeywords, setHistoryItem }) {
  const { userInfo } = useUserInfo();

  function handleMovePage() {
    if (userInfo[0]) {
      chrome.tabs.create({ url: "https://stickysearcher.site" });
    } else {
      chrome.tabs.create({ url: "https://stickysearcher.site/login" });
    }
  }

  async function handleAddHistory(countsPerKeywords) {
    if (!userInfo[0]) {
      chrome.tabs.create({ url: "https://stickysearcher.site/login" });
    } else {
      let userId = await getUser(userInfo[0]);
      if (!userId) {
        userId = await addNewUserAndDefaultGroup(userInfo[0]);
      }
      const history = await getHistoryData(countsPerKeywords);
      await addHistoryToDefaultGroup(userId, history);

      async function getHistoryItem(userEmail) {
        let userId = await getUser(userEmail);
        const histories = await getHistoriesInDefaultGroup(userId);
        setHistoryItem(histories);
      }
      getHistoryItem(userInfo[0]);
    }
  }

  async function getHistoryData(countsPerKeywords) {
    const tabs = await chrome.tabs.query({
      currentWindow: true,
      active: true,
    });
    const activeTab = tabs[0];

    const history = {
      faviconSrc: activeTab.favIconUrl,
      siteTitle: activeTab.title,
      url: activeTab.url,
      createdTime: new Date().toISOString(),
      keywords: [...countsPerKeywords],
    };

    return history;
  }

  return (
    <div
      id="urls"
      className="historyButton_wrap rounded-[15px] flex gap-[15px]"
    >
      <IconButton
        iconSrc={"./history_icon.png"}
        text={"History"}
        onClick={() => handleAddHistory(countsPerKeywords)}
      />
      <IconButton
        iconSrc={"./page_Icon.png"}
        text={"History Page"}
        onClick={handleMovePage}
      />
    </div>
  );
}

HistorySection.propTypes = {
  countsPerKeywords: PropTypes.array.isRequired,
  setHistoryItem: PropTypes.func.isRequired,
};
