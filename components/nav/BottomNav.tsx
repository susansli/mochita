import { bottomNavData } from "@/data/data";
import { View } from "react-native";
import BottomNavIcon from "./BottomNavIcon";

export default function BottomNav() {
  function renderBottomNavIcons() {
    return bottomNavData.map((data, i) => {
      return <BottomNavIcon key={i} name={data.name} label={data.label} />;
    });
  }

  return (
    <View className="flex-row justify-between px-7 py-3 w-full bg-white rounded-2xl shadow">
        {renderBottomNavIcons()}
    </View>
  );
}
