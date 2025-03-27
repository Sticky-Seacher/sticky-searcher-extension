import PropTypes from "prop-types";

export function ToggleableKeywordButton({
  keyword,
  isOn,
  color,
  toggleKeywordIsOn,
}) {
  return (
    <button
      onClick={toggleKeywordIsOn}
      style={{ backgroundColor: isOn ? color : "#ccc" }}
      className="px-2 py-1 rounded"
    >
      {keyword}
    </button>
  );
}

ToggleableKeywordButton.propTypes = {
  keyword: PropTypes.string.isRequired,
  isOn: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  toggleKeywordIsOn: PropTypes.func.isRequired,
};
