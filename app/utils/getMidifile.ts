import database from "@/data/database";
import { cache } from "react";

export const getMidifile = cache(async (id: string) => {
  return database.find((e) => e.id === Number(id));
});

export const getInstruments = cache(async () => {
  const instrumentCounts = database
    .map((e) => e.instruments)
    .flat()
    .filter(Boolean)
    .reduce((acc, instrument) => {
      acc[instrument] = (acc[instrument] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const result = Object.keys(instrumentCounts)
    .map((name) => ({
      t: name,
      c: instrumentCounts[name],
    }))
    .sort((a, b) => a.t.localeCompare(b.t));
  return result;
});

export const getTags = cache(async () => {
  const tagCounts = database
    .map((e) => e.tags)
    .flat()
    .filter(Boolean)
    .reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const result = Object.keys(tagCounts)
    .map((name) => ({
      t: name,
      c: tagCounts[name],
    }))
    .sort((a, b) => a.t.localeCompare(b.t));
  return result;
});
