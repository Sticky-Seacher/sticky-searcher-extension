export function HistoryButton() {
  return (
    <div className="w-[420px] flex flex-col m-[20px]">
      <div
        id="urls"
        className="historyButton_wrap rounded-[15px] flex gap-[15px] "
      >
        <button
          id="getUrl"
          className="w-[50%] h-[45px] bg-[#333] text-[#fff] rounded-[5px] flex justify-center items-center"
        >
          <img
            src="./history_icon.png"
            alt="history_icon1"
            className="w-[17px] mr-[7px]"
          />
          <span className="font-extralight">History</span>
        </button>

        <button
          id="getUrl"
          className="w-[50%] h-[45px] bg-[#eee] text-[#333] rounded-[5px] flex justify-center items-center"
        >
          <img
            src="./page_Icon.png"
            alt="history_icon1"
            className="w-[15px] mr-[7px]"
          />
          <span className="font-extralight">History Page</span>
        </button>
      </div>

      <div className="flex justify-center items-center relative">
        <input
          type="text"
          className="w-full h-[50px] border border-[100] pl-[20px] my-[30px] text-[#333] rounded-full"
          placeholder="키워드를 입력해 주세요"
        />
        <div className="buttonWrap absolute right-0 h-[50px] flex gap-[15px]">
          <span className="text-[#ccc] font-extralight leading-[50px]">
            Total
          </span>
          <button>↑</button>
          <button>↓</button>
          <button className="bg-[#333] w-[70px] h-full flex justify-center items-center rounded-r-full">
            <img
              src="./search_icon.png"
              alt="search_icon"
              className="w-[30px]"
            />
          </button>
        </div>
      </div>

      <div className="flex gap-[15px]">
        <button className="bg-[#333] text-[#fff] border w-[50%] py-[10px] rounded-full">
          Description
        </button>
        <button className="bg-[#fff] text-[#333] border w-[50%] py-[10px] rounded-full">
          Keyword
        </button>
      </div>

      <div>
        <p className="text-lg font-semibold mt-[10px] mb-[10px]">
          Keyword Group
        </p>
        <ul className="bg-[#f6f6f6] h-60 overflow-y-scroll border text-center grid grid-cols-3 gap-[15px] px-[10px] py-[20px]">
          <li className="bg-[#333] text-[#fff] text-xs py-[10px] rounded-full">
            <button>keyword 1</button>
          </li>
          <li className="text-[#ddd] text-xs font-light border py-[10px] rounded-full">
            <button>keyword 2</button>
          </li>
          <li className="text-[#ddd] text-xs font-light border py-[10px] rounded-full">
            <button>keyword 3</button>
          </li>
          <li className="text-[#ddd] text-xs font-light border py-[10px] rounded-full">
            <button>keyword 4</button>
          </li>
          <li className="text-[#ddd] text-xs font-light border py-[10px] rounded-full">
            <button>keyword 5</button>
          </li>
          <li className="text-[#ddd] text-xs font-light border py-[10px] rounded-full">
            <button>keyword 6</button>
          </li>
          <li className="text-[#ddd] text-xs font-light border py-[10px] rounded-full">
            <button>keyword 7</button>
          </li>
          <li className="text-[#ddd] text-xs font-light border py-[10px] rounded-full">
            <button>keyword 8</button>
          </li>
          <li className="text-[#ddd] text-xs font-light border py-[10px] rounded-full">
            <button>keyword 9</button>
          </li>
          <li className="text-[#ddd] text-xs font-light border py-[10px] rounded-full">
            <button>keyword 10</button>
          </li>
          <li className="text-[#ddd] text-xs font-light border py-[10px] rounded-full">
            <button>keyword 11</button>
          </li>
          <li className="text-[#ddd] text-xs font-light border py-[10px] rounded-full">
            <button>keyword 12</button>
          </li>
          <li className="text-[#ddd] text-xs font-light border py-[10px] rounded-full">
            <button>keyword 13</button>
          </li>
          <li className="text-[#ddd] text-xs font-light border py-[10px] rounded-full">
            <button>keyword 14</button>
          </li>
        </ul>
      </div>

      <div>
        <p className="text-lg font-semibold mt-[10px] mb-[10px]">
          lately History Group
        </p>
        <ul className="bg-[#f6f6f6] h-60 overflow-y-scroll border text-left px-[10px] py-[20px]">
          <li className="text-xs text-[#555] bg-[#fff] border px-[15px] mb-[15px] py-[10px] rounded-full w-full">
            <a href="#">
              프론트엔드 3기 프로젝트 가이드 문서vanillacoding.craft.mev
            </a>
          </li>
          <li className="text-xs text-[#555] bg-[#fff] border px-[15px] mb-[15px] py-[10px] rounded-full w-full">
            <a href="#">
              2025년 개발자를 위한 최고의 Chrome 확장 프로그램 12가지
            </a>
          </li>
          <li className="text-xs text-[#555] bg-[#fff] border px-[15px] mb-[15px] py-[10px] rounded-full w-full">
            <a href="#">
              프론트엔드 3기 프로젝트 가이드 문서vanillacoding.craft.mev
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
