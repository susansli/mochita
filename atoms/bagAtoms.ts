import { EquippedItems, ItemCardData } from "@/data/dataInterfaces";
import { atom } from "jotai";

export const equippedItemsAtom = atom<EquippedItems>({});
export const inventoryItemsAtom = atom<ItemCardData[]>([]);
export const isMaxHappinessNotifAtom = atom<boolean>(false); // if this is true, then travel announcement always plays