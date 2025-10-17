import { ItemType } from "@/util/enums";
import {
  BottomNavData,
  ItemCardData,
  TopStatusBarData,
} from "./dataInterfaces";

export const bottomNavData: BottomNavData[] = [
  {
    name: "book",
    label: "Journal",
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

export const storeItemsList: ItemCardData[] = [
  {
    imgUrl: "https://i.imgur.com/aQTw3oT.png",
    type: ItemType.TICKET,
    sproutCost: 15,
    name: "Airline Ticket",
  },
  {
    imgUrl: "https://i.imgur.com/8sRVZeg.png",
    type: ItemType.TICKET,
    sproutCost: 10,
    name: "Tram Pass",
  },
  {
    imgUrl: "https://i.imgur.com/foOAmc4.png",
    type: ItemType.LUCKY_CHARM,
    sproutCost: 8,
    name: "Doki Charm",
  },
  {
    imgUrl: "https://i.imgur.com/iqiSuJw.png",
    type: ItemType.SNACK,
    sproutCost: 4,
    name: "O-Bento",
  },
  {
    imgUrl: "https://i.imgur.com/zHa81k2.png",
    type: ItemType.SNACK,
    sproutCost: 3,
    name: "Vitasoy",
  },
  {
    imgUrl: "https://i.imgur.com/o0BDkZE.png",
    type: ItemType.BAG,
    sproutCost: 6,
    name: "Mochipack",
  },
  {
    imgUrl: "https://i.imgur.com/DHU6WVe.png",
    type: ItemType.TREAT,
    sproutCost: 2,
    name: "Taiyaki",
  },
  {
    imgUrl: "https://i.imgur.com/fPq9ZjK.png",
    type: ItemType.TREAT,
    sproutCost: 2,
    name: "Nigiri Toy",
  }
];
