import { ItemType } from "./enums";

export function returnItemType(itemType: ItemType): string {
    switch (itemType) {
      case ItemType.BAG:
        return "Bag";
      case ItemType.LUCKY_CHARM:
        return "Charm";
      case ItemType.SNACK:
        return "Snack";
      case ItemType.TICKET:
        return "Ticket";
      default:
        return "Treat";
    }
  }