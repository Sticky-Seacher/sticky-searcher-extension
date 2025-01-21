import PropTypes from "prop-types";

export default function TextButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#333] text-[#fff] border w-[50%] py-[10px] rounded-full"
    >
      {text}
    </button>
  );
}

TextButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
