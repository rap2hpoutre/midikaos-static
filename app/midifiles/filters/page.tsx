import { LinkItemNoRouter } from "@/app/filter-links-no-router";
import { updateFilter } from "@/app/utils/filters";
import { getInstruments, getTags } from "@/app/utils/getMidifile";
import Link from "next/link";
import React from "react";

export const Midifile = () => {};

function Tags({ tags }: any) {
  return (
    <div>
      <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-4">
        {tags.map((tag: any) => (
          <div key={tag.t}>
            <LinkItemNoRouter
              value={tag.t}
              href={(item: any) => "/?search=" + updateFilter("", "tags", item)}
            />
            <span className="ml-2 text-gray-500">({tag.c})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Instruments({ instruments }: any) {
  return (
    <div>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4">
        {instruments.map((instrument: any) => (
          <div key={instrument.t}>
            <LinkItemNoRouter
              value={instrument.t}
              href={(item: any) =>
                "/?search=" + updateFilter("", "instruments", item)
              }
            />
            <span className="ml-2 text-gray-500">({instrument.c})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const ShowFiltersPage = async () => {
  const instruments = await getInstruments();
  const tags = await getTags();
  return (
    <div className="m-5">
      <h2 className="text-xl my-5 font-bold">Index of Tags</h2>
      <Tags tags={tags} />
      <h2 className="text-xl my-5 font-bold">Index of Instruments</h2>
      <Instruments instruments={instruments} />
      <p className="my-8">
        <Link className="btn-purple m-5" href="/">
          Back to search page
        </Link>
      </p>
    </div>
  );
};

export default ShowFiltersPage;
