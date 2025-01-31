import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const UserInfoContext = createContext(null);

export default function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = useState(() => {
    const userEmail = localStorage.getItem("userEmail");
    const userAccessToken = localStorage.getItem("userAccessToken");
    const userInfo = [userEmail, userAccessToken];

    return userInfo;
  });

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
