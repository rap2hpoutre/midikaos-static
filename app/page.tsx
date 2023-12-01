"use client";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import Suggestion from "./suggestion";
import FakeDocuments from "./fake-documents";
import { MidifilesList } from "./midifiles-list";
import { useRouter, useSearchParams } from "next/navigation";

function updateFilter(search: string, type: string, value: string): string {
  return `${type}:${value.match(" ") ? `"${value}"` : value} ${search.replace(
    new RegExp(`${type}:(".*"|[^ ]+)`, "gm"),
    ""
  )}`
    .trim()
    .replace(/\s\s+/g, " ");
}

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 0);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  useEffect(() => {
    setPage(Number(searchParams.get("page")) || 0);
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    router.push("?search=" + search + "&page=" + page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const goToPreviousPage = () => setPage(page - 1);
  const goToNextPage = () => setPage(page + 1);
  const handleChange = (event: any) => {
    setPage(0);
    setSearch(event.target.value);
  };
  const handleFilter = (type: string, value: string) => {
    setPage(0);
    setSearch(updateFilter(search, type, value));
  };
  return (
    <main>
      <div>
        <div className="flex flex-col">
          <input
            onChange={handleChange}
            value={search}
            className="m-5 border p-3 rounded"
            placeholder="Search for midi files by track name or artist: carmina, jobim, matteo, etc."
          />
        </div>

        <div className="mx-5">
          <Suggestion
            type="tags"
            handleClick={(item: any) => handleFilter("tags", item)}
            list={["folk music", "classical", "flamenco", "bluegrass"]}
          />
          <Suggestion
            type="instruments"
            handleClick={(item: any) => handleFilter("instruments", item)}
            list={[
              "piano",
              "shanai",
              "trumpet",
              "banjo",
              "acoustic guitar (steel)",
              "vibraphone",
            ]}
          />
          <Suggestion
            type="countries"
            handleClick={(item: any) => handleFilter("tags", item)}
            list={[
              "greece",
              "japan",
              "iran",
              "venezuela",
              "algeria",
              "bulgaria",
              "peru",
            ]}
          />
        </div>
        <Suspense fallback={<FakeDocuments />}>
          <MidifilesList
            handleFilter={handleFilter}
            page={page}
            search={search}
            setSearch={setSearch}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
          />
        </Suspense>
      </div>
    </main>
  );
}
