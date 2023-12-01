import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Midikaos - MIDI Files Library",
  description:
    "A Standard MIDI Files Library with 3K tracks collected by a music teacher at the end of the 20th century",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { title } = metadata;
  const fullTitle = `Midikaos - ${title}`;
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <link
          rel="search"
          href="/opensearch.xml"
          type="application/opensearchdescription+xml"
          title="Midikaos"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <meta property="og:title" content={fullTitle} />
        <meta
          property="og:description"
          content="A Standard MIDI Files Library with 3K tracks from the end of the 20th century."
        />
        <meta
          property="og:image"
          content="http://midikaos.mnstrl.org/circuit.svg"
        />
        <meta property="og:url" content="http://midikaos.mnstrl.org/" />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </head>

      <body className={inter.className}>
        <div className="container mx-auto py-5 text-gray-900">
          <div className="ml-5 flex flex-row">
            <a href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/circuit.svg" className="h-8" alt="logo" />
            </a>
            <h1 className="ml-4 text-3xl font-bold tracking-wider font-mono">
              <a href="/">Midikaos</a>
            </h1>
            <span className="sm:visible invisible mt-2 ml-3 text-gray-700">
              A Standard MIDI Files Library
            </span>
          </div>

          {children}
          <div className="flex justify-center mt-5 text-gray-700">
            <Link href="/about" className="link-pink mr-1">
              About
            </Link>
            -
            <a
              className="link-pink ml-1"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/rap2hpoutre/midikaos-static"
            >
              Source code
            </a>
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
