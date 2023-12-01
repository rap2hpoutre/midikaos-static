import Link from "next/link";

export default function NoResults({ setSearch }: any) {
  const midifiles: any[] = [];
  return (
    <div className="m-5">
      <h2 className="text-purple-600 font-bold text-xl">Oops, no result.</h2>
      <p>
        Hopefully, there may be some data that could be worthy of interest! You
        could try:
      </p>
      <ul className="list-disc p-5">
        <li>
          <button className="link-pink" onClick={() => setSearch("dance")}>
            Dance
          </button>{" "}
          while listening a{" "}
          <button className="link-pink" onClick={() => setSearch("samba")}>
            samba
          </button>
          , a{" "}
          <button className="link-pink" onClick={() => setSearch("tags:choro")}>
            choro
          </button>{" "}
          or a{" "}
          <button
            className="link-pink"
            onClick={() => setSearch("tags:klezmer")}
          >
            klezmer
          </button>{" "}
          track
        </li>
        <li>
          Explore the world by listening to music from{" "}
          <button className="link-pink" onClick={() => setSearch("tags:asia")}>
            Asia
          </button>
          ,{" "}
          <button
            className="link-pink"
            onClick={() => setSearch('tags:"north america"')}
          >
            North America
          </button>{" "}
          or{" "}
          <button
            className="link-pink"
            onClick={() => setSearch('tags:"central europe"')}
          >
            Central Europe
          </button>
        </li>
        <li>
          Download{" "}
          <button
            className="link-pink"
            onClick={() => setSearch('tags:"celtic music"')}
          >
            celtic
          </button>
          ,{" "}
          <button
            className="link-pink"
            onClick={() => setSearch("tags:arabic")}
          >
            arabic
          </button>{" "}
          or{" "}
          <button
            className="link-pink"
            onClick={() => setSearch("tags:medieval")}
          >
            medieval
          </button>{" "}
          music
        </li>
        <li>
          Try one of these random tracks:
          <ul className="list-disc pl-5">
            {midifiles.map((midifile) => (
              <li key={midifile.id}>
                <Link
                  className="link-pink"
                  href="/midifiles/[midifileId]"
                  as={`/midifiles/${midifile.id}`}
                >
                  {midifile.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
