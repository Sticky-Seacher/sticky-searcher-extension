/* eslint-disable no-unused-vars */
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
  const rootCollection = doc(db, token, title);
  await setDoc(rootCollection, {
    title,
  });
}

async function addHistory(token, title, faviconSrc, siteTitle, url, keywords) {
  const subCollection = doc(collection(db, token, title, "histories"));
  await setDoc(subCollection, {
    faviconSrc,
    siteTitle,
    url,
    createdTime: "",
    keywords,
  });
}

async function getGroups(token) {
  const groups = query(collection(db, token));
  const groupList = await getDocs(groups);
  groupList.forEach((group) => {
    group;
  });
}

async function getHistories(token, title) {
  const histories = query(collection(db, token, title, "histories"));
  const historyList = await getDocs(histories);
  historyList.forEach((history) => {
    const historyData = {
      ...history.data(),
      id: history.id,
    };
  });
}

async function deleteGroup(token, title) {
  await deleteDoc(doc(db, token, title));
}

async function deleteHistory(token, title) {
  await deleteDoc(doc(db, token, title, "histories", "history.id"));
}

export {
  addGroup,
  addHistory,
  getGroups,
  getHistories,
  deleteGroup,
  deleteHistory,
};
