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
    <View className="flex justify-between p-2 w-full h-16 m-2 bg-white rounded-lg shadow z-50">
        {renderBottomNavIcons() }
    </View>
  );
}
