import PropTypes from "prop-types";

import { ToggleableKeywordButton } from "./ToggleableKeywordButton";

const BACKGROUND_COLORS = [
  "#CFF09E",
  "#A8DBA8",
  "#D7FFF1",
  "#ffdb9d",
  "#DDDDDD",
  "#FADAD8",
  "#b0dcff",
  "#dac8ff",
];

export function KeywordGroup({ toggleStatus, setToggleStatus, handleDelete }) {
  function toggleIsOn(targetKeyword) {
    const nextStatus = toggleStatus.map(({ keyword, isOn, color }) => {
      if (keyword === targetKeyword) {
        return { keyword, isOn: !isOn, color };
      }
      return { keyword, isOn, color };
    });

    setToggleStatus(nextStatus);
  }

  const updatedToggleStatus = toggleStatus.map(({ keyword, isOn }, index) => {
    const color = BACKGROUND_COLORS[index % BACKGROUND_COLORS.length];
    return { keyword, isOn, color };
  });

  return (
    <>
      <div>
        <p className="text-lg font-semibold mt-[10px] mb-[10px]">
          Keyword Group
        </p>
        <ul className="bg-[#f6f6f6] h-[200px] overflow-y-scroll border text-center grid grid-cols-3 gap-[15px] px-[10px] py-[20px]">
          {updatedToggleStatus.map(({ keyword, isOn, color }) => {
            return (
              <li
                key={keyword}
                className="text-xs py-[10px] h-fit"
              >
                <ToggleableKeywordButton
                  keyword={keyword}
                  isOn={isOn}
                  color={color}
                  toggleKeywordIsOn={() => toggleIsOn(keyword)}
                />
                <button
                  onClick={() => handleDelete(keyword)}
                  className="px-1"
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

KeywordGroup.propTypes = {
  toggleStatus: PropTypes.array.isRequired,
  setToggleStatus: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
