import { ItemType } from "./enums";
import * as SecureStore from "expo-secure-store";

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

export async function getUserId() {
  return await SecureStore.getItemAsync("userId");
}

export function aggregateEvents(modifiers: string[]): string[] {
    const eventMap = new Map<string, { value: number; unit: string }>();

    for (const mod of modifiers) {
        const cleanMod = mod.trim().replace(/\.$/, "");

        let sign = 1;
        let remaining = cleanMod;

        if (remaining.startsWith("Increases ")) {
            sign = 1;
            remaining = remaining.replace(/^Increases /, "");
        } else if (remaining.startsWith("Decreases ")) {
            sign = -1;
            remaining = remaining.replace(/^Decreases /, "");
        } else {
            continue; 
        }

        remaining = remaining.replace(/^the chance of /, "");

        const parts = remaining.split(" and ");

        for (const part of parts) {
            const match = part.match(/^(.*?)\s+by\s+([\d.]+)(.*)$/);
            
            if (match) {
                let rawEventName = match[1].trim();
                const parsedValue = parseFloat(match[2]);
                const unit = match[3].trim(); 

                // Remove leading "a " or "an " (case-insensitive)
                rawEventName = rawEventName.replace(/^(a|an)\s+/i, "");

                const normalizedEventName = rawEventName.toLowerCase();
                const mapKey = `${normalizedEventName}|${unit}`;

                const current = eventMap.get(mapKey) || { value: 0, unit };
                current.value += sign * parsedValue;
                eventMap.set(mapKey, current);
            }
        }
    }

    const result: string[] = [];

    for (const [key, data] of eventMap.entries()) {
        const finalValue = Math.round(data.value * 10000) / 10000;
        if (finalValue === 0) continue;

        const eventName = key.split("|")[0];
        const capitalizedEvent = eventName.charAt(0).toUpperCase() + eventName.slice(1);
        const signStr = finalValue > 0 ? "+" : ""; 
        const unitSpace = /^[a-zA-Z]/.test(data.unit) ? " " : "";

        result.push(`${capitalizedEvent} ${signStr}${finalValue}${unitSpace}${data.unit}`);
    }

    return result;
}