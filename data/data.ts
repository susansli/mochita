import { ItemType } from "@/util/enums";
import {
  BottomNavData,
  ItemCardData,
  TagData,
  TopStatusBarData,
} from "./dataInterfaces";

export const bottomNavData: BottomNavData[] = [
  {
    name: "book",
    label: "Journal",
    link: "/pages/journal",
  },
  {
    name: "star",
    label: "Goals",
    link: "/pages/goals",
  },
  {
    name: "shopping-bag",
    label: "Bag",
    link: "/pages/bag",
  },
  {
    name: "map-marker",
    label: "Travel",
    link: "/pages/travel",
  },
  {
    name: "chevron-right",
    label: "Back",
  },
];

export const topStatusBarData: TopStatusBarData = {
  currentHappiness: 2,
  day: 1,
  weather: "Sunny",
  sprouts: 0,
};

export const tagData: TagData[] = [
  { label: "Personal", value: "0", color: "#f97316" },
  { label: "Motivation", value: "1", color: "#22c55e" },
  { label: "Goals", value: "2", color: "#6366f1" },
  { label: "Reflection", value: "3", color: "#3b82f6" },
  { label: "Wins", value: "4", color: "#ec4899" },
];
