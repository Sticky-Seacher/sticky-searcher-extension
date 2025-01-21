import PropTypes from "prop-types";
import { useState } from "react";

export default function IconButton({ iconSrc, text }) {
  const [userToken, setUserToken] = useState(null); // eslint-disable-line no-unused-vars

  function handleLogin() {
    chrome.runtime.sendMessage(
      {
        message: "userStatus",
      },
      (response) => {
        if (response.message) {
          setUserToken(response.message);
          chrome.tabs.create({ url: "http://localhost:5174" });
        }
      }
    );
  }
  return (
    <button
      id="getUrl"
      className="w-[50%] h-[45px] bg-[#333] text-[#fff] rounded-[5px] flex justify-center items-center"
      onClick={handleLogin}
    >
      <img
        src={iconSrc}
        alt="history_icon"
        className="w-[17px] mr-[7px]"
      />
      <span className="font-extralight">{text}</span>
    </button>
  );
}

IconButton.propTypes = {
  text: PropTypes.string.isRequired,
  iconSrc: PropTypes.string.isRequired,
};
