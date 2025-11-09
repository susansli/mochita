import { topStatusBarData } from "@/data/data";
import { atom } from "jotai";

export const topStatusHappinessAtom = atom<number>(topStatusBarData.currentHappiness);
export const topStatusSproutsAtom = atom<number>(topStatusBarData.sprouts);
export const mochitaSpeechAtom = atom<string>("");