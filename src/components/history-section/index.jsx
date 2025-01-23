import PropTypes from "prop-types";

import { addDefaultGroup, addHistory } from "../../firebase/CRUD";
import IconButton from "../shared/IconButton";

export default function HistorySection({ countsPerKeywords }) {
  let userToken = "";
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const currentDate = new Intl.DateTimeFormat("ko-KR", options).format(
    new Date()
  );
  const groupId = "new-keyword-group";
  const favicon = "favicon";
  const siteName = "구글";
  const url = "https://www.google.com/";
  const keywords = { apple: 3, banana: 15 };

  function handleMovePage() {
    chrome.runtime.sendMessage(
      {
        message: "userStatus",
      },
      (response) => {
        if (response.message) {
          userToken = response.message;
          chrome.tabs.create({ url: "http://localhost:5174" });
        }
      }
    );
  }

  async function handleAddHistory(countsPerKeywords) {
    // eslint-disable-next-line no-unused-vars
    const history = await getHistoryData(countsPerKeywords);

    chrome.runtime.sendMessage(
      {
        message: "userStatus",
      },
      (response) => {
        if (response.message) {
          userToken = response.message;
          addDefaultGroup(userToken);
          addHistory(
            userToken,
            groupId,
            favicon,
            siteName,
            url,
            currentDate,
            keywords
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
