import Link from "next/link";
import FilterLinks from "./filter-links";

type SuggestionProps = {
  handleClick: Function;
  list: string[];
  type: string;
};

export default function Suggestion({
  handleClick,
  list,
  type,
}: SuggestionProps) {
  return (
    <div className="my-1 text-sm">
      <b className="text-purple-600">{type}:</b>
      &nbsp;
      <FilterLinks
        values={list}
        handleClick={(item: any) => handleClick(item)}
      />
      {", "}
      <Link href="/midifiles/filters" as={`/midifiles/filters`}>
        more…
      </Link>
    </div>
  );
}
