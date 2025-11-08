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

export function sortNumericStringsDescStable(values: string[]): string[] {
  return values
    .map((s, i) => ({ s, n: Number(s.trim()), i }))
    .sort((A, B) => (B.n - A.n) || (A.i - B.i)) // tie-break by original index
    .map(({ s }) => s);
}

export function dateFromMMDDYYYY(s: string): Date {
  const [mm, dd, yyyy] = s.split("/").map(Number);
  return new Date(yyyy, mm - 1, dd); // months are 0-indexed
}

export function truncateText(text: string, length: number, ellipses?: boolean) {
  return `${text.slice(0, length)}${(ellipses && text.length > length) ? "..." : ""}`;
}