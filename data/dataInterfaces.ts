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
