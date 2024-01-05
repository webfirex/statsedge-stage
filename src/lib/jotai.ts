import { atom } from "jotai";
import { GAME_LIST } from "./data";

export const SelectedGameAtom = atom(GAME_LIST[0]!);
