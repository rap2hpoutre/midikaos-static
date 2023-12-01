import React from "react";
import { flag } from "country-emoji";

function cuteText(text: string): String {
  const f = flag(text);
  if (f) return `${f} ${text}`;
  if (text === "medieval") return `🏰 ${text}`;
  return text;
}

export const LinkItem = ({ value, handleClick }: any) => (
  <button
    className="outline-none hover:text-pink-500 hover:underline"
    onClick={() => handleClick(value)}
  >
    {cuteText(value)}
  </button>
);

export default function FilterLinks({ values, handleClick }: any) {
  return values.map((v: string, i: number) => [
    i > 0 && ", ",
    <LinkItem key={v} handleClick={handleClick} value={v} />,
  ]);
}
