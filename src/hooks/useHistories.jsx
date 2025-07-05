import { useQuery } from "@tanstack/react-query";

import { useUserInfo } from "../context/UserInfo";
import { getHistoriesInDefaultGroup } from "../firebase/history";
import { getUser } from "../firebase/user";

export default function useHistories() {
  const { userInfo } = useUserInfo();

  const userEmail = userInfo[0];

  const historiesQuery = useQuery({
    queryKey: ["histories", userEmail],
    queryFn: async () => {
      if (!userEmail) {
        return [];
      }

      const userId = await getUser(userEmail);
      const histories = await getHistoriesInDefaultGroup(userId);

      return histories;
    },
  });

  return {
    historiesQuery,
  };
}
