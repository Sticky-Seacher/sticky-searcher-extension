import PropTypes from "prop-types";

export default function TextButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#333] text-[#fff] border w-[50%] px-[20px] py-[10px] rounded-full"
<<<<<<< HEAD
    >
      {text}
    </button>
  );
}

export function ToggleableTextButton({ text, onClick, isOn }) {
  return (
    <button
      onClick={onClick}
      className={`${isOn ? "bg-[#333]" : "bg-transparent"} text-[${isOn ? "#fff" : "#dddddd"}] border w-[50%] py-[10px] rounded-full`}
=======
>>>>>>> 06d1a9b (fix: 블루아르곤 에러 개선 및 버전 업데이트 (#60))
    >
      {text}
    </button>
  );
}

export function ToggleableTextButton({ text, onClick, isOn }) {
  return (
    <button
      onClick={onClick}
      className={`${isOn ? "bg-[#333]" : "bg-transparent"} text-[${isOn ? "#fff" : "#dddddd"}] border w-[50%] py-[10px] rounded-full`}
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
