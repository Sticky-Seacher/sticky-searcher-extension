import { addDoc, collection } from "firebase/firestore";

import { db } from "../firebase";

const users = collection(db, "users");
const user = await addDoc(users, {
  uid: "",
  accessToken: "",
});

const groups = collection(db, "users", user.id, "groups");
const group = await addDoc(groups, {
  id: "",
  title: "",
});

const histories = collection(
  db,
  "users",
  user.id,
  "groups",
  group.id,
  "histories"
);
const history = await addDoc(histories, {
  id: "",
  faviconSrc: "",
  siteTitle: "",
  url: "현재 url",
  createdTime: "",
  keywords: {
    keyword1: 30,
    keyword2: 10,
  },
});

export { users, user, groups, histories, history };
