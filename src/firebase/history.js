import { addDoc, collection, getDocs, limit, query } from "firebase/firestore";

import { db } from "./firebase";

export async function addHistoryToDefaultGroup(userId, history) {
  const historiesRef = collection(
    db,
    "users",
    userId,
    "groups",
    "default",
    "histories"
  );

  const historyForDB = {
    faviconSrc: history.faviconSrc ? history.faviconSrc : "",
    siteTitle: history.siteTitle,
    url: history.url,
    createdTime: history.createdTime,
    keywords: history.keywords,
  };

  const historyDocRef = await addDoc(historiesRef, historyForDB);

  return historyDocRef.id;
}

export async function getHistoriesInDefaultGroup(userId) {
  const histories = [];
  const defaultGroupHistoriesRef = query(
    collection(db, "users", userId, "groups", "default", "histories"),
    limit[10]
  );

  const defaultGroupHistoriesQuerySnapshot = await getDocs(
    defaultGroupHistoriesRef
  );
  defaultGroupHistoriesQuerySnapshot.forEach((historyDoc) => {
    histories.push({
      id: historyDoc.id,
      faviconSrc: historyDoc.data().faviconSrc,
      siteTitle: historyDoc.data().siteTitle,
      url: historyDoc.data().url,
      createdTime: historyDoc.data().createdTime,
      keywords: historyDoc.data().keywords,
    });
  });

  return histories;
}
