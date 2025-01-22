import { addDefaultGroup, addHistory } from "../../firebase/CRUD";
import IconButton from "../shared/IconButton";

export default function HistorySection() {
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
  const groupTitle = "New Keyword Group";
  const favicon = "favicon";
  const siteName = "구글";
  const url = "google.com";
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

  function handleAddHistory() {
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
            groupTitle,
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

  return (
    <div
      id="urls"
      className="historyButton_wrap rounded-[15px] flex gap-[15px] "
    >
      <IconButton
        iconSrc={"./history_icon.png"}
        text={"History"}
        onClick={handleAddHistory}
      />
      <IconButton
        iconSrc={"./page_Icon.png"}
        text={"History Page"}
        onClick={handleMovePage}
      />
    </div>
  );
}
