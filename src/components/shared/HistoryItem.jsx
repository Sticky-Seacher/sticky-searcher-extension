import PropTypes from "prop-types";

export default function HistoryItem({ favicon, siteTitle, url }) {
  function handleMoveUrl() {
    chrome.tabs.create({ url: url });
  }
  return (
    <li className="text-xs text-[#555] bg-[#fff] border px-[15px] mb-[15px] py-[10px] rounded-full w-full">
      <div
        onClick={handleMoveUrl}
        className="flex gap-[10px] justify-start items-center"
      >
        <div className="w-[20px] h-[20px] object-fill rounded-full">
          <img src={favicon} />
        </div>
        {siteTitle}
      </div>
    </li>
  );
}

HistoryItem.propTypes = {
  url: PropTypes.string.isRequired,
  favicon: PropTypes.string.isRequired,
  siteTitle: PropTypes.string.isRequired,
};
