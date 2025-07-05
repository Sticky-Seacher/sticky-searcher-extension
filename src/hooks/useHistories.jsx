import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useUserInfo } from "../context/UserInfo";
import {
  addHistoryToDefaultGroup,
  getHistoriesInDefaultGroup,
} from "../firebase/history";
import { addNewUserAndDefaultGroup, getUser } from "../firebase/user";

export default function useHistories() {
  const { userInfo } = useUserInfo();
  const queryClient = useQueryClient();

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
    initialData: [],
  });

  const historiesMutation = useMutation({
    mutationFn: async (history) => {
      if (!userEmail) {
        return [];
      }

      let userId = await getUser(userEmail);
      if (!userId) {
        userId = await addNewUserAndDefaultGroup(userInfo[0]);
      }

      addHistoryToDefaultGroup(userId, history);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["histories", userEmail] });
    },
  });

  return {
    historiesQuery,
    historiesMutation,
  };
}
