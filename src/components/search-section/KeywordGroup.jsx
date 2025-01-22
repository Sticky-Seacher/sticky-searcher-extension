import PropTypes from "prop-types";

import TextButton from "../shared/TextButton";

export function KeywordGroup({ countsPerKeywords }) {
  const existingKeywords = countsPerKeywords.map(({ keyword }) => keyword);
  return (
    <>
      <div>
        <p className="text-lg font-semibold mt-[10px] mb-[10px]">
          Keyword Group
        </p>
        <ul className="bg-[#f6f6f6] h-60 overflow-y-scroll border text-center grid grid-cols-3 gap-[15px] px-[10px] py-[20px]">
          {existingKeywords.map((keyword, index) => {
            return (
              <li
                key={index}
                className="bg-[#333] text-[#fff] text-xs py-[10px] rounded-full"
              >
                <TextButton text={keyword} />
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
};
