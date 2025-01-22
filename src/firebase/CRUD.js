import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";

import { db } from "./firebase";

async function addGroup(token, title) {
  const rootCollection = doc(db, token);
  await setDoc(rootCollection, {
    title,
  });
}

async function addHistory(
  token,
  title,
  faviconSrc,
  siteTitle,
  url,
  createdTime,
  keywords
) {
  const subCollection = doc(collection(db, token, title, "histories"));
  await setDoc(subCollection, {
    faviconSrc,
    siteTitle,
    url,
    createdTime,
    keywords,
  });
}

async function getGroups(token, callback) {
  const groups = query(collection(db, token));
  const groupList = await getDocs(groups);
  groupList.forEach((group) => {
    const groupData = {
      ...group.data(),
      id: group.id,
    };
    callback((prev) => [...prev, groupData]);
  });
}

async function getHistories(token, groupId, callback) {
  const histories = query(collection(db, token, groupId, "histories"));
  const historyList = await getDocs(histories);
  historyList.forEach((history) => {
    const historyData = {
      ...history.data(),
      id: history.id,
    };
    callback((prev) => [...prev, historyData]);
  });
}

async function deleteGroup(token, title) {
  await deleteDoc(doc(db, token, title));
}

async function deleteHistory(token, title, historyId) {
  await deleteDoc(doc(db, token, title, "histories", historyId));
}

export {
  addGroup,
  addHistory,
  getGroups,
  getHistories,
  deleteGroup,
  deleteHistory,
};
