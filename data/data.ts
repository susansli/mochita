import { BottomNavData, TopStatusBarData } from "./dataInterfaces";

export const bottomNavData: BottomNavData[] = [
  {
    name: "book",
    label: "Journal",
  },
  {
    name: "star",
    label: "Goals",
    link: "/pages/goals"
  },
  {
    name: "shopping-bag",
    label: "Bag",
  },
  {
    name: "map-marker",
    label: "Travel",
  },
  {
    name: "chevron-right",
    label: "Back",
  },
];

export const topStatusBarData: TopStatusBarData = {
  currentHappiness: 3,
  day: 1,
  weather: "Sunny",
  sprouts: 25
};

