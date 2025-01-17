import TextButton from "../shared/TextButton";
import { KeywordGroup } from "./KetwordGroup";
import { SearchSectionInput } from "./SearchSectionInput";

export default function SearchSection() {
  return (
    <>
      <SearchSectionInput />
      <div className="flex gap-[15px]">
        <TextButton text={"Descrition"} />
        <TextButton text={"keyword"} />
      </div>
      <KeywordGroup />
    </>
  );
}
