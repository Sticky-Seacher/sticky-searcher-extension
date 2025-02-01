import PropTypes from "prop-types";
import { useEffect } from "react";

import { useUserInfo } from "../../context/UserInfo";
import { getHistoriesInDefaultGroup } from "../../firebase/history";
import { getUser } from "../../firebase/user";
import HistoryItem from "../shared/HistoryItem";

export default function LatelyHistoryGroup({ historyItem, setHistoryItem }) {
  const { userInfo } = useUserInfo();

  useEffect(() => {
    async function getHistoryItem(userEmail) {
      let userId = await getUser(userEmail);
      const histories = await getHistoriesInDefaultGroup(userId);
      setHistoryItem(histories);
    }
    userInfo[0] && getHistoryItem(userInfo[0]);
  }, [userInfo]);

  return (
    <div>
      <p className="text-lg font-semibold mt-[10px] mb-[10px]">
        lately History Group
      </p>
      <ul className="bg-[#f6f6f6] h-60 overflow-y-scroll border text-left px-[10px] py-[20px]">
        {historyItem.map((history, index) => {
          return (
            <HistoryItem
              key={index}
              favicon={history.faviconSrc}
              siteTitle={history.siteTitle}
              url={history.url}
            />
          );
        })}
      </ul>
    </div>
  );
}

LatelyHistoryGroup.propTypes = {
  historyItem: PropTypes.array.isRequired,
  setHistoryItem: PropTypes.func.isRequired,
};
