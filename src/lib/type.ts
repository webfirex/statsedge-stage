import { type RouterOutputs } from "~/utils/api";
import { type SportApi } from "./sport-api";
import { type UnwrapPromise } from "next/dist/lib/coalesced-function";

export type MatchType = Exclude<RouterOutputs["fixture"]["get"], null>;

export type PlayerStatsType = Exclude<
  UnwrapPromise<ReturnType<typeof SportApi.Player.Stats.Call>>,
  null
>;
