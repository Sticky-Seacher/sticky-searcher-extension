import PropTypes from "prop-types";
import { useRef } from "react";

import { makeRandomBackgroundColor } from "../../../content-script/highlight.js";

export default function TextButton({ text, onClick }) {
  const colorRef = useRef(makeRandomBackgroundColor());

  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: colorRef.current }}
      className="text-[#fff] border w-[50%] py-[10px] rounded-full"
    >
      {text}
    </button>
  );
}

export function ToggleableTextButton({ text, onClick, isOn }) {
  const colorRef = useRef(makeRandomBackgroundColor());

  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: isOn ? colorRef.current : "transparent" }}
      className={`text-[${isOn ? "#fff" : "#dddddd"}] border w-[75%] py-[10px] rounded-full`}
    >
      {text}
    </button>
  );
}

TextButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

ToggleableTextButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isOn: PropTypes.bool.isRequired,
};
