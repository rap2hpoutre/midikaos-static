import { Suspense } from "react";
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

export const MidifilesList = ({
  search,
  page,
  handleFilter,
  goToPreviousPage,
  goToNextPage,
  setSearch,
}: any) => {
  const regex = /\w+:(".*"|[^ ]+)/gi;
  const modifiers = (search.match(regex) || []).map((e: any) => e.split(":"));
  const remainingQuery = search.replace(regex, "").trim().toLowerCase();

  const midifiles = database.filter((e) => {
    if (!remainingQuery && !modifiers.length) return true;
    if (!modifiers.length) {
      return (
        e.name.toLowerCase().includes(remainingQuery) ||
        (e.artist && e.artist.toLowerCase().includes(remainingQuery)) ||
        (e.tags && e.tags.includes(remainingQuery)) ||
        (e.instruments && e.instruments.includes(remainingQuery))
      );
    }
    if (!remainingQuery) {
      return modifiers?.every((modifier: any) => {
        const [key, value] = modifier;
        if (key === "bpm") {
          return e.bpm === parseInt(value.replace(/"/g, ""));
        } else if (key === "duration") {
          return e.duration === parseInt(value.replace(/"/g, ""));
        } else if (key === "tags") {
          return e.tags?.includes(value.replace(/"/g, ""));
        } else if (key === "instruments") {
          return e.instruments?.includes(value.replace(/"/g, ""));
        } else {
          return false;
        }
      });
    }
    return (
      (e.name.toLowerCase().includes(remainingQuery) ||
        (e.artist && e.artist.includes(remainingQuery)) ||
        (e.tags && e.tags.includes(remainingQuery)) ||
        (e.instruments && e.instruments.includes(remainingQuery))) &&
      modifiers?.every((modifier: any) => {
        const [key, value] = modifier;
        if (key === "bpm") {
          return e.bpm === parseInt(value);
        } else if (key === "duration") {
          return e.duration === parseInt(value);
        } else if (key === "tags") {
          return e.tags?.includes(value);
        } else if (key === "instruments") {
          return e.instruments?.includes(value);
        } else {
          return false;
        }
      })
    );
  });
  const hasMore = false;
  const count = 10;

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
          <NoResults setSearch={setSearch} />
        </Suspense>
      )}
    </div>
  );
};
