import PropTypes from "prop-types";

import { useUserInfo } from "../../context/UserInfo";
import { addDefaultGroup, addHistory } from "../../firebase/CRUD";
import IconButton from "../shared/IconButton";

export default function HistorySection({ countsPerKeywords }) {
  const { setUserInfo } = useUserInfo();

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
    const history = await getHistoryData(countsPerKeywords);
    const groupId = "new-keyword-group";
    const options = {
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const currentDate = new Intl.DateTimeFormat("ko-KR", options).format(
      new Date(history.createdTime)
    );
    const favicon = history.faviconSrc ? history.faviconSrc : "";

    chrome.runtime.sendMessage(
      {
        message: "userStatus",
      },
      (response) => {
        if (response.message) {
          const userToken = response.message;
          addDefaultGroup(userToken);
          addHistory(
            userToken,
            groupId,
            favicon,
            history.siteTitle,
            history.url,
            currentDate,
            history.keywords
          );
        }
      }
    );
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
