import { JournalEntries, JournalEntryData } from "@/data/dataInterfaces";
import { atom } from "jotai";

export const journalEntriesAtom = atom<JournalEntries>({});
export const activeJournalEntryAtom = atom<JournalEntryData | undefined>(undefined);