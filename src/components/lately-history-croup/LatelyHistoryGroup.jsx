import { useEffect, useState } from "react";

import { getHistories } from "../../firebase/CRUD";

export default function LatelyHistoryGroup() {
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    chrome.runtime.sendMessage(
      {
        message: "userStatus",
      },
      (response) => {
        if (response.message) {
          const userToken = response.message;
          const groupId = "New Keyword Group";
          getHistories(userToken, groupId, setHistoryList);
        }
      }
    );
  }, []);

  return (
    <div>
      <p className="text-lg font-semibold mt-[10px] mb-[10px]">
        lately History Group
      </p>
      <ul className="bg-[#f6f6f6] h-60 overflow-y-scroll border text-left px-[10px] py-[20px]">
        {historyList.map((history, index) => {
          return (
            <li
              key={index}
              className="text-xs text-[#555] bg-[#fff] border px-[15px] mb-[15px] py-[10px] rounded-full w-full"
            >
              <a href={history.url}>
                {history.faviconSrc}
                {history.siteTitle}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
