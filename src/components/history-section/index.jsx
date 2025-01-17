import IconButton from "../shared/IconButton";

export default function HistorySection() {
  return (
    <div
      id="urls"
      className="historyButton_wrap rounded-[15px] flex gap-[15px] "
    >
      <IconButton
        iconSrc={"./history_icon.png"}
        text={"History"}
      />
      <IconButton
        iconSrc={"./page_Icon.png"}
        text={"History Page"}
      />
    </div>
  );
}
