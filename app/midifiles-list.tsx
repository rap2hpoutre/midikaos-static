import { Suspense, use, useMemo } from "react";
import MidifileItem from "./midifile-item";
import NoResults from "./no-results";
import database from "@/data/database";

function Documents({
  midifiles,
  count,
  handleFilter,
  page,
  goToPreviousPage,
  hasMore,
  goToNextPage,
}: any) {
  return (
    <>
      <div className="flex justify-end mr-5 text-sm text-gray-700">
        {count} results
      </div>
      <ul>
        {midifiles.map((midifile: any) => (
          <MidifileItem
            key={midifile.id}
            midifile={midifile}
            handleFilter={(type: any, value: any) => handleFilter(type, value)}
          />
        ))}
      </ul>
      <div className="flex justify-end mr-5">
        <button
          disabled={page === 0}
          onClick={goToPreviousPage}
          className={`btn-purple${page === 0 ? "-disabled" : ""}`}
        >
          ⇦ Previous
        </button>
        <button
          disabled={!hasMore}
          onClick={goToNextPage}
          className={`ml-4 btn-purple${!hasMore ? "-disabled" : ""}`}
        >
          Next ⇨
        </button>
      </div>
    </>
  );
}

const regex = /\w+:(".*"|[^ ]+)/gi;

export const MidifilesList = ({
  search,
  page,
  handleFilter,
  goToPreviousPage,
  goToNextPage,
  setSearch,
}: any) => {
  const modifiers = useMemo(() => {
    return (search.match(regex) || []).map((e: any) => e.split(":"));
  }, [search]);
  const remainingQuery = useMemo(() => {
    return search.replace(regex, "").trim().toLowerCase();
  }, [search]);
  const midifilesAllMatches = useMemo(
    () =>
      database.filter((e) => {
        if (!remainingQuery && !modifiers.length) return true;

        const queryMatch = (field: string, query: string) =>
          field.toLowerCase() === query || field.toLowerCase().includes(query);

        const modifierMatch = (modifier: [string, string]) => {
          const [key, value] = modifier;
          switch (key) {
            case "bpm":
              return e.bpm === parseInt(value.replace(/"/g, ""));
            case "duration":
              return e.duration === parseInt(value.replace(/"/g, ""));
            case "tags":
              return e.tags?.includes(value.replace(/"/g, ""));
            case "instruments":
              return e.instruments?.includes(value.replace(/"/g, ""));
            default:
              return false;
          }
        };

        if (!modifiers.length) {
          return (
            queryMatch(e.name, remainingQuery) ||
            (e.artist && queryMatch(e.artist, remainingQuery)) ||
            (e.tags && e.tags.includes(remainingQuery)) ||
            (e.instruments && e.instruments.includes(remainingQuery))
          );
        }

        if (!remainingQuery) {
          return modifiers.every(modifierMatch);
        }

        return (
          (queryMatch(e.name, remainingQuery) ||
            (e.artist && queryMatch(e.artist, remainingQuery)) ||
            (e.tags && e.tags.includes(remainingQuery)) ||
            (e.instruments && e.instruments.includes(remainingQuery))) &&
          modifiers.every(modifierMatch)
        );
      }),
    [modifiers, remainingQuery]
  );

  const hasMore = midifilesAllMatches.length > 10;
  const count = midifilesAllMatches.length;
  const midifiles = midifilesAllMatches.slice(page * 10, page * 10 + 10);
  return (
    <div>
      {count ? (
        <Documents
          midifiles={midifiles}
          count={count}
          handleFilter={handleFilter}
          page={page}
          goToPreviousPage={goToPreviousPage}
          hasMore={hasMore}
          goToNextPage={goToNextPage}
        />
      ) : (
        <Suspense
          fallback={
            <div className="m-5 text-gray-500 animate-pulse">Loading...</div>
          }
        >
          <NoResults setSearch={setSearch} search={search} />
        </Suspense>
      )}
    </div>
  );
};
