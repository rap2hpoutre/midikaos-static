import dynamic from "next/dynamic";

import React from "react";
import { getMidifile } from "@/app/utils/getMidifile";
import Link from "next/link";
import FilterLinksNoRouter from "@/app/filter-links-no-router";
import { Metadata } from "next";
import { updateFilter } from "@/app/utils/filters";
const MidiPlayer = dynamic(() => import("../midiplayer"), {
  ssr: false,
});

export const revalidate = 3600 * 24 * 7; // 1 week

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const id = params.id;
  const midifile = await getMidifile(id);
  if (!midifile) return { title: "Midikaos" };
  return {
    title: `Midikaos - ${midifile.name}`,
    description: `Listen to ${
      midifile.name
    }, a free MIDI file on Midikaos. Play, download, or share this track ${
      midifile.artist ? `(by ${midifile.artist}) ` : ""
    } from your web browser`,
  };
}

function fmtMSS(s: number): string {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
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

const Midifile = ({ midifile }: any) => {
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
            <FilterLinksNoRouter
              values={midifile.instruments}
              href={(item: any) =>
                "/?search=" + updateFilter("", "instruments", item)
              }
            />
          }
        />
        <Line
          name="tags"
          value={
            <FilterLinksNoRouter
              values={midifile.tags}
              href={(item: any) => "/?search=" + updateFilter("", "tags", item)}
            />
          }
        />
        <Line name="bpm" value={midifile.bpm} />
        <Line name="duration" value={fmtMSS(midifile.duration)} />
      </dl>
    </div>
  );
};

const MidifileId = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const midifile = await getMidifile(id);
  return (
    <div>
      <Midifile midifile={midifile} />
      <p>
        <Link className="btn-purple m-5" href="/">
          Back to list
        </Link>
      </p>
    </div>
  );
};

export async function generateStaticParams() {
  const paths = [];
  for (let i = 1; i < 2958; i++) {
    paths.push({ id: String(i) });
  }
  return paths;
}

export const dynamicParams = false;

export default MidifileId;
