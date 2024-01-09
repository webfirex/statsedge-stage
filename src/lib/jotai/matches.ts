import { atomWithImmer } from "jotai-immer";
import { SPORT_INFO } from "../data";

export const MatchesPageAtom = atomWithImmer<{
  page: number;
  per: number;
  total: number;
  tab: string;
  sport: (typeof SPORT_INFO)[0];
  from: Date | null;
  to: Date | null;
  upcoming: boolean;
}>({
  page: 1,
  per: 10,
  total: 0,
  tab: "all",
  sport: SPORT_INFO[0]!,
  from: null,
  to: null,
  upcoming: true,
});
