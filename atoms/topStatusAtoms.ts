import { topStatusBarData } from "@/data/data";
import { atom } from "jotai";

// placeholder data!

export const topStatusHappinessAtom = atom<number>(topStatusBarData.currentHappiness);
export const topStatusSproutsAtom = atom<number>(topStatusBarData.sprouts);