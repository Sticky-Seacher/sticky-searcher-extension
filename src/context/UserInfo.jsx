import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

const UserInfoContext = createContext(null);

export default function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = useState(() => {
    const userEmail = localStorage.getItem("userEmail");
    const userAccessToken = localStorage.getItem("userAccessToken");
    const userInfo = [userEmail, userAccessToken];

    return userInfo;
  });

  useEffect(() => {
    function setUserData() {
      const userEmail = localStorage.getItem("userEmail");
      const userAccessToken = localStorage.getItem("userAccessToken");

      if (
        userEmail !== null &&
        userAccessToken !== null &&
        userEmail !== userInfo[0] &&
        userAccessToken !== userInfo[1]
      ) {
        setUserInfo([userEmail, userAccessToken]);
      }
    }
    window.addEventListener("storage", setUserData);
    return () => window.removeEventListener("storage", setUserData);
  }, []);

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
}

export const useUserInfo = () => useContext(UserInfoContext);

UserInfoProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
