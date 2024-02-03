import { type RouterOutputs } from "~/utils/api";

export type MatchType = Exclude<RouterOutputs["fixture"]["get"], null>;
