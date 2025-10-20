import { View } from "react-native";
import BagSlot from "./BagSlot";

export default function BagContents() {
  return (
    <View className="flex-row flex-wrap p-5 rounded-lg bg-teal-500 mt-7">
      <View className="w-1/2 p-2 items-center">
        <BagSlot />
      </View>
      <View className="w-1/2 p-2 items-center">
        <BagSlot />
      </View>
      <View className="w-1/2 p-2 items-center">
        <BagSlot />
      </View>
      <View className="w-1/2 p-2 items-center">
        <BagSlot />
      </View>
    </View>
  );
}
