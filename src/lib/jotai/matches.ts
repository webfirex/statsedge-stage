import { atomWithImmer } from "jotai-immer";

export const MatchesPageAtom = atomWithImmer<{
  page: number;
  per: number;
  total: number;
  tab: string;
  sport: string;
  sport_name: string;
  from: Date | null;
  to: Date | null;
  upcoming: boolean;
}>({
  page: 1,
  per: 10,
  total: 0,
  tab: "all",
  sport: "lol",
  sport_name: "League of Legends",
  from: new Date(),
  to: new Date(),
  upcoming: true,
});
