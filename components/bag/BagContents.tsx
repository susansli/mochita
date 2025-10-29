import { equippedItemsAtom } from "@/atoms/bagAtoms";
import { EquippedItems } from "@/data/dataInterfaces";
import { ItemType } from "@/util/enums";
import { useAtomValue } from "jotai";
import { View } from "react-native";
import BagSlot from "./BagSlot";

export default function BagContents() {

  const equippedItems = useAtomValue<EquippedItems>(equippedItemsAtom);

  return (
    <View className="flex-row flex-wrap p-5 rounded-lg bg-teal-500 mt-7">
      <View className="w-1/2 p-2 items-center">
        <BagSlot item={equippedItems[ItemType.TICKET]} />
      </View>
      <View className="w-1/2 p-2 items-center">
        <BagSlot item={equippedItems[ItemType.BAG]} />
      </View>
      <View className="w-1/2 p-2 items-center">
        <BagSlot item={equippedItems[ItemType.LUCKY_CHARM]} />
      </View>
      <View className="w-1/2 p-2 items-center">
        <BagSlot item={equippedItems[ItemType.SNACK]} />
      </View>
    </View>
  );
}
