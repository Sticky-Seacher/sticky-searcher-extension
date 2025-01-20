export function SearchSectionInput() {
  function handleArrowClick(goto) {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { goto });
    });
  }

  return (
    <>
      <input
        type="text"
        className="w-full h-[50px] border border-[100] pl-[20px] my-[30px] text-[#333] rounded-full"
        placeholder="키워드를 입력해 주세요"
      />
      <div className="buttonWrap absolute top-[75px] right-0 h-[50px] flex gap-[15px]">
        <span className="text-[#ccc] font-extralight leading-[50px]">
          Total
        </span>
        <button onClick={() => handleArrowClick("prev")}>↑</button>
        <button onClick={() => handleArrowClick("next")}>↓</button>
        <button className="bg-[#333] w-[70px] h-full flex justify-center items-center rounded-r-full">
          <img
            src="./search_icon.png"
            alt="search_icon"
            className="w-[30px]"
          />
        </button>
      </div>
    </>
  );
}
