import { GoalCardData } from "@/data/dataInterfaces";
import { atom } from "jotai";

export const goalsListAtom = atom<GoalCardData[]>([]);
