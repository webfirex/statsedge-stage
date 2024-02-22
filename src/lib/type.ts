import { type RouterOutputs } from "~/utils/api";
import { type SportApi } from "./sport-api";
import { type UnwrapPromise } from "next/dist/lib/coalesced-function";
import { type PlayerStatsTest } from "./sport-api/player/stats-test";

export type MatchType = Exclude<RouterOutputs["fixture"]["get"], null>;

export type PlayerStatsType = Exclude<
  UnwrapPromise<ReturnType<typeof SportApi.Player.Stats.Call>>,
  null
>;

export type PlayerStatsTestType = Exclude<
  UnwrapPromise<ReturnType<typeof PlayerStatsTest.Call>>,
  null
>;
