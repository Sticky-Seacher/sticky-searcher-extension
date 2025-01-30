import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { db } from "./firebase";

export async function addNewUserAndDefaultGroup(email) {
  const userDocRef = await addDoc(collection(db, "users"), {
    email: email,
  });

  const groupsRef = collection(db, "users", userDocRef.id, "groups");

  await setDoc(doc(groupsRef, "default"), {
    name: "New Keyword Group",
  });

  return userDocRef.id;
}

export async function getUser(email) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));

  const querySnapshot = await getDocs(q);
  const userIdList = [];
  if (querySnapshot.empty) {
    return null;
  } else {
    querySnapshot.forEach((user) => {
      userIdList.push(user.id);
    });
    return userIdList[0];
  }
}
