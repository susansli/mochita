import { JournalEntries } from "@/data/dataInterfaces";
import { atom } from "jotai";

export const journalEntriesAtom = atom<JournalEntries>({})