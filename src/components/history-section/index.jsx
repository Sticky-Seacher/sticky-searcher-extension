/* eslint-disable no-unused-vars */
import { useState } from "react";

import IconButton from "../shared/IconButton";

export default function HistorySection() {
  const [userToken, setUserToken] = useState(null);
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

  function handleMovePage() {
    chrome.runtime.sendMessage(
      {
        message: "userStatus",
      },
      (response) => {
        if (response.message) {
          setUserToken(response.message);
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
          setUserToken(response.message);
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
