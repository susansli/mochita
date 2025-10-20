import { EquippedItems, ItemCardData } from "@/data/dataInterfaces";
import { atom } from "jotai";

export const equippedItemsAtom = atom<EquippedItems>({});
export const inventoryItemsAtom = atom<ItemCardData[]>([]);