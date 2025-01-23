import PropTypes from "prop-types";

import { ToggleableKeywordButton } from "./ToggleableKeywordButton";

export function KeywordGroup({ countsPerKeywords, handleDelete }) {
  const existingKeywords = countsPerKeywords.map(({ keyword }) => keyword);

  return (
    <>
      <div>
        <p className="text-lg font-semibold mt-[10px] mb-[10px]">
          Keyword Group
        </p>
        <ul className="bg-[#f6f6f6] h-60 overflow-y-scroll border text-center grid grid-cols-3 gap-[15px] px-[10px] py-[20px]">
          {existingKeywords.map((keyword) => {
            return (
              <li
                key={keyword}
                className="text-xs py-[10px]"
              >
                <ToggleableKeywordButton
                  isAll={false}
                  keyword={keyword}
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
  countsPerKeywords: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
