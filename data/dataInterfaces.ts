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

export interface StoreItemCardData {
    imgUrl: string;
    type: ItemType;
    sproutCost: number;
    name: string;
    happiness?: number;
}

export interface BagItemCardData {
    imgUrl: string;
    type: ItemType;
    qty: number;
    name: string;
    happiness?: number;
}