import { useState } from "react";

import IconButton from "../shared/IconButton";

export default function HistorySection() {
  const [userToken, setUserToken] = useState(null); // eslint-disable-line no-unused-vars

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

  return (
    <div
      id="urls"
      className="historyButton_wrap rounded-[15px] flex gap-[15px] "
    >
      <IconButton
        iconSrc={"./history_icon.png"}
        text={"History"}
      />
      <IconButton
        iconSrc={"./page_Icon.png"}
        text={"History Page"}
        onClick={handleMovePage}
      />
    </div>
  );
}
