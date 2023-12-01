import React from "react";
import { flag } from "country-emoji";
import Link from "next/link";

function cuteText(text: string): String {
  const f = flag(text);
  if (f) return `${f} ${text}`;
  if (text === "medieval") return `🏰 ${text}`;
  return text;
}

export const LinkItemNoRouter = ({ value, href }: any) => (
  <Link
    className="outline-none hover:text-pink-500 hover:underline"
    href={href(value)}
  >
    {cuteText(value)}
  </Link>
);

export default function FilterLinksNoRouter({ values, href }: any) {
  return values.map((v: string, i: number) => [
    i > 0 && ", ",
    <LinkItemNoRouter key={v} href={href} value={v} />,
  ]);
}
