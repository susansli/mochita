import { PostcardData, TripData } from "@/data/dataInterfaces";
import { atom } from "jotai";

export const isTravelingAtom = atom<boolean>(false);
export const isMailAvailableAtom = atom<boolean>(false);
export const tripDataAtom = atom<TripData | null>(null);
export const postcardDataAtom = atom<PostcardData | null>(null);