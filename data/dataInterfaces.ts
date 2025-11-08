import { ItemType } from "@/util/enums";

export interface BottomNavData {
    name: string;
    label: string;
    link?: string;
}

export interface TopStatusBarData {
    currentHappiness: number;
    day: number;
    weather: string;
    sprouts: number;
}

export interface GoalCardData {
    index: number;
    goal: string;
    isComplete: boolean;
}

export interface ItemCardData {
    name: string;
    imgUrl: string;
    type: ItemType;
    sproutCost?: number;
    qty?: number;
    happiness?: number;
}

export interface EquippedItems {
    [key: string] : ItemCardData;
}

export interface JournalTag {
    label: string;
    color: string;
}

export interface JournalEntryData {
    date: string;
    text: string;
    tags?: JournalTag[];
}

export interface JournalEntries {
    [key: string] : JournalEntryData; // key is numerical date, sorted in desc order
}
