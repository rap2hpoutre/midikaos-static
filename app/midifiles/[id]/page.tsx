"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import React from "react";
import FilterLinks from "../../filter-links";
import database from "@/data/database";
const MidiPlayer = dynamic(() => import("../midiplayer"), {
  ssr: false,
});

function metaDescription(data: any) {
  return `Listen to ${
    data.name
  }, a free MIDI file on Midikaos. Play, download, or share this track ${
    data.artist ? `(by ${data.artist}) ` : ""
  } from your web browser`;
}

function fmtMSS(s: number): string {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
}

function updateFilter(search: string, type: string, value: string): string {
  return `${type}:${value.match(" ") ? `"${value}"` : value} ${search.replace(
    new RegExp(`${type}:(".*"|[^ ]+)`, "gm"),
    ""
  )}`
    .trim()
    .replace(/\s\s+/g, " ");
}

const baseUrl = process.env.MIDIFILES_URL || "https://mnstrl.org/midifiles/";

function Line({ name, value }: { name: string; value: any }) {
  if (!value) return null;
  return (
    <>
      <dd className="mt-4 text-purple-600 font-bold">{name}</dd>
      <dt>{value}</dt>
    </>
  );
}

export const Midifile = ({ midifile }: any) => {
  const router = useRouter();
  return (
    <div className="border border-gray-400 shadow-md m-5 p-5 rounded-md">
      <h2 className="text-xl">
        {midifile.name}{" "}
        <span className="text-gray-500 float-right"> #{midifile.id}</span>
      </h2>
      <div className="grid grid-cols-2">
        <div>
          <MidiPlayer
            url={`${baseUrl}/${midifile.path}`}
            duration={midifile.duration}
          />
        </div>
        <div className="flex justify-end my-3">
          <a className="btn-pink" href={`${baseUrl}/${midifile.path}`}>
            Download
          </a>
        </div>
      </div>
      <dl>
        <Line name="artist" value={midifile.artist} />
        <Line name="description" value={midifile.description} />
        <Line
          name="instruments"
          value={
            <FilterLinks
              values={midifile.instruments}
              handleClick={(item: any) =>
                router.push("/?search=" + updateFilter("", "instruments", item))
              }
            />
          }
        />
        <Line
          name="tags"
          value={
            <FilterLinks
              values={midifile.tags}
              handleClick={(item: any) =>
                router.push("/?search=" + updateFilter("", "tags", item))
              }
            />
          }
        />
        <Line name="bpm" value={midifile.bpm} />
        <Line name="duration" value={fmtMSS(midifile.duration)} />
      </dl>
    </div>
  );
};

const MidifileId = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const midifile = database.find((e) => e.id === Number(id));
  const router = useRouter();
  return (
    <div>
      <Midifile midifile={midifile} />
      <p>
        <button className="btn-purple m-5" onClick={() => router.back()}>
          Back to list
        </button>
      </p>
    </div>
  );
};

export default MidifileId;
