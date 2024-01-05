import { atom } from "jotai";
import { GAME_LIST } from "./data";

export const AuthModalAtom = atom<"signin" | "signup" | null>(null);

export const SelectedGameAtom = atom(GAME_LIST[0]!);
