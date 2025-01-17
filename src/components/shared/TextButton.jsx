/* eslint-disable react/prop-types */
export default function TextButton({ text }) {
  return (
    <button className="bg-[#333] text-[#fff] border w-[50%] py-[10px] rounded-full">
      {text}
    </button>
  );
}
