import { deleteDoc, doc, getDocs } from "firebase/firestore";

import { groups, histories, user, users } from "./firebase-collection";

const addHistory = async () => {
  user;
};

const getUser = async () => {
  const userData = await getDocs(users);
  return userData.docs.map((user) => user.data());
};

const getGroup = async () => {
  const groupData = await getDocs(groups);
  return groupData.docs.map((group) => group.data());
};

const getHistory = async () => {
  const historyData = await getDocs(histories);
  return historyData.docs.map((history) => history.data());
};

const deleteHistory = async () => {
  await deleteDoc(doc(users, user.id));
};

export { addHistory, getUser, getGroup, getHistory, deleteHistory };
