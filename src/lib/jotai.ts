import { atom } from "jotai";
import { GAME_LIST , TAB_LIST} from "./data";

export const SelectedGameAtom = atom(GAME_LIST[0]!);
export const SelectedCompTabAtom=atom(TAB_LIST[0]!)