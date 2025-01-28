import { addDoc, collection } from "firebase/firestore";

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
