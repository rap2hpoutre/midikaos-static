import Link from "next/link";
import FilterLinks from "./filter-links";

type MidifileProps = {
  midifile: any;
  handleFilter: Function;
};

type Values = {
  tags: Element | string[] | any;
  duration: string;
  bpm: Number;
  instruments: Element | string[] | any;
};

const removeFalsy = (obj: Values): Values | any =>
  Object.entries(obj).reduce(
    (a, [k, v]) => (v ? ((a[k as keyof Values] = v), a) : a),
    {} as Values
  );

function fmtMSS(s: number): string {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
}

function title(midifile: any) {
  if (midifile.artist) {
    return (
      <>
        <span className="text-pink-500 font-bold hover:underline">
          {midifile.name}
        </span>{" "}
        - <i>By {midifile.artist}</i>
      </>
    );
  }
  return (
    <span className="text-pink-500 font-bold hover:underline">
      {midifile.name}
    </span>
  );
}

function description(
  { tags, bpm, duration, instruments }: any,
  handleFilter: any
) {
  const values: Values = removeFalsy({
    tags,
    duration: fmtMSS(duration),
    bpm,
    instruments,
  });
  if (values.tags)
    values.tags = (
      <FilterLinks
        values={values.tags}
        handleClick={(item: any) => handleFilter("tags", item)}
      />
    );

  if (values.instruments)
    values.instruments = (
      <FilterLinks
        values={values.instruments}
        handleClick={(item: any) => handleFilter("instruments", item)}
      />
    );

  return (
    <div className="text-sm">
      {Object.entries(values).map(([key, value]) => (
        <div key={key}>
          <b>{key}</b>: {value}
        </div>
      ))}
    </div>
  );
}

export default function MidifileItem({
  midifile,
  handleFilter,
}: MidifileProps) {
  return (
    <li
      key={midifile.id}
      className="border border-gray-400 shadow-md m-5 p-5 rounded-md"
    >
      <Link href="/midifiles/[midifileId]" as={`/midifiles/${midifile.id}`}>
        {title(midifile)}
      </Link>
      {description(midifile, handleFilter)}
    </li>
  );
}
