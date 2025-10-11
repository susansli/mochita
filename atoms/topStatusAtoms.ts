import { DEFAULT_HAPPINESS } from "@/util/constants";
import { atom } from "jotai";

export const topStatusHappinessAtom = atom<number>(DEFAULT_HAPPINESS);