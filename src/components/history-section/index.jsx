import PropTypes from "prop-types";

import { useUserInfo } from "../../context/UserInfo";
import { addHistoryToDefaultGroup } from "../../firebase/history";
import { addNewUserAndDefaultGroup, getUser } from "../../firebase/user";
import IconButton from "../shared/IconButton";

export default function HistorySection({ countsPerKeywords }) {
  const { userInfo, setUserInfo } = useUserInfo();

  function handleMovePage() {
    const userEmail = localStorage.getItem("userEmail");
    const userAccessToken = localStorage.getItem("userAccessToken");

    setUserInfo([userEmail, userAccessToken]);

    if (userEmail && userAccessToken) {
      chrome.tabs.create({ url: "http://localhost:5173" });
    } else {
      chrome.tabs.create({ url: "http://localhost:5173/login" });
    }
  }

  async function handleAddHistory(countsPerKeywords) {
    const userEmail = localStorage.getItem("userEmail");
    const userAccessToken = localStorage.getItem("userAccessToken");

    setUserInfo([userEmail, userAccessToken]);

    if (!userEmail && !userAccessToken) {
      chrome.tabs.create({ url: "http://localhost:5173/login" });
    } else {
      const email = userInfo[0];

      if (!email) {
        return;
      }
      let userId = await getUser(email);
      if (!userId) {
        userId = await addNewUserAndDefaultGroup(email);
      }
      const history = await getHistoryData(countsPerKeywords);
      await addHistoryToDefaultGroup(userId, history);
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
      className="historyButton_wrap rounded-[15px] flex gap-[15px] "
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
};
