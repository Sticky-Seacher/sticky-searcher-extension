import PropTypes from "prop-types";

export default function IconButton({ iconSrc, text, onClick }) {
  return (
    <button
      id="getUrl"
      className="w-[50%] h-[45px] bg-[#333] text-[#fff] rounded-[5px] flex justify-center items-center"
      onClick={onClick}
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
  onClick: PropTypes.func.isRequired,
};
