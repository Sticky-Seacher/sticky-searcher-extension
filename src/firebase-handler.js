import { addDoc, collection } from "firebase/firestore";

import { db } from "./firebase";

const users = collection(db, "users");
export const user = await addDoc(users, {
  uid: "안녕",
  accessToken: "",
});

const groups = collection(db, "users", user.id, "groups");
export const group = await addDoc(groups, {
  id: "t",
  title: "yy",
});

const histories = collection(
  db,
  "users",
  user.id,
  "groups",
  group.id,
  "histories"
);
export const history = await addDoc(histories, {
  id: "",
  faviconSrc: "",
  siteTitle: "",
  url: "현재 url",
  createdTime: "",
  keywords: {
    keyword1: 6,
    keyword2: 40,
  },
});
