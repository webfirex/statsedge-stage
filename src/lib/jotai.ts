import { atom } from "jotai";

export const AuthModalAtom = atom<"signin" | "signup" | null>(null);

export const SelectedGameAtom = atom<string>("LOL");
