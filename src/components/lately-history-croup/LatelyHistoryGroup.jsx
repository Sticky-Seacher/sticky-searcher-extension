import { useEffect, useState } from "react";

import { getHistories } from "../../firebase/CRUD";
import HistoryItem from "../shared/HistoryItem";

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
          const groupId = "new-keyword-group";
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
            <HistoryItem
              key={index}
              url={history.url}
              favicon={history.faviconSrc}
              siteTitle={history.siteTitle}
            />
          );
        })}
      </ul>
    </div>
  );
}
