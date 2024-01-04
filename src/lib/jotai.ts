import { atom } from "jotai";

export const AuthModalAtom = atom<"signin" | "signup" | null>(null);
