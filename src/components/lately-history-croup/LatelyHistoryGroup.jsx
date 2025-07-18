import useHistories from "../../hooks/useHistories";
import HistoryItem from "../shared/HistoryItem";

export default function LatelyHistoryGroup() {
  const {
    historiesQuery: { data: histories },
  } = useHistories();

  return (
    <div>
      <p className="text-lg font-semibold mt-[10px] mb-[10px]">
        lately History Group
      </p>
      <ul className="bg-[#f6f6f6] h-60 overflow-y-scroll border text-left px-[10px] py-[20px]">
        {histories.map((history, index) => {
          return (
            <HistoryItem
              key={index}
              favicon={history.faviconSrc}
              siteTitle={history.siteTitle}
              url={history.url}
            />
          );
        })}
      </ul>
    </div>
  );
}
