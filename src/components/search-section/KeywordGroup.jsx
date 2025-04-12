import PropTypes from "prop-types";

import { ToggleableKeywordButton } from "./ToggleableKeywordButton";

export function KeywordGroup({ toggleStatus, setToggleStatus, handleDelete }) {
  function toggleIsOn(targetKeyword) {
    const nextStatus = toggleStatus.map(({ keyword, isOn }) => {
      if (keyword === targetKeyword) {
        return { keyword, isOn: !isOn };
      }
      return { keyword, isOn };
    });

    setToggleStatus(nextStatus);
  }

  return (
    <>
      <div>
        <p className="text-lg font-semibold mt-[10px] mb-[10px]">
          Keyword Group
        </p>
        <ul className="bg-[#f6f6f6] h-60 overflow-y-scroll border text-center grid grid-cols-3 gap-[15px] px-[10px] py-[20px]">
          {toggleStatus.map(({ keyword, isOn }) => {
            return (
              <li
                key={keyword}
                className="text-xs py-[10px] h-fit"
              >
                <ToggleableKeywordButton
                  keyword={keyword}
                  isOn={isOn}
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
