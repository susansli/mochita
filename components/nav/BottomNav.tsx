import { isNavbarCollapsedAtom } from "@/atoms/navAtoms";
import { bottomNavData } from "@/data/data";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAtom } from "jotai";
import { Platform, StyleSheet, View } from "react-native";
import { Text } from "../ui/text";
import Spacer from "../utility/Spacer";
import BottomNavIcon from "./BottomNavIcon";

export default function BottomNav() {
  const [isNavBarCollapsed, setIsNavBarCollapsed] = useAtom<boolean>(
    isNavbarCollapsedAtom
  );

//   Race condition with Nativewind shadows
  const styles = StyleSheet.create({
    shadow: {
      backgroundColor: "#fff",
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
        },
        android: {
          elevation: 4,
        },
        web: {
          boxShadow: "2px 2px 2px 0 rgba(0,0,0,0.2)",
        },
      }),
    },
  });
  function renderBottomNavIcons(): React.ReactNode[] {
    return bottomNavData.map((data, i) => {
      return <BottomNavIcon key={i} name={data.name} label={data.label} />;
    });
  }

  function renderExpandedNav(): React.ReactNode {
    return (
      <View
        className="flex-row justify-between px-3 py-2 w-full bg-white rounded-2xl"
        style={styles.shadow}
      >
        <View className="flex-row justify-between px-7 py-2 w-full bg-white rounded-2xl">
          {renderBottomNavIcons()}
        </View>
      </View>
    );
  }

  function renderCollapsedNav(): React.ReactNode {
    return (
      <View className="flex-row w-full">
        <Spacer />
        <View
          className="flex-col rounded-full w-20 h-20 bg-white justify-center items-center"
          style={styles.shadow}
        >
          <View
            className="flex-col gap-2 justify-center items-center"
            onTouchEnd={() => setIsNavBarCollapsed(false)}
          >
            <FontAwesome name={"chevron-left"} size={20} color="teal" />
            <Text className="text-xs">Menu</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View>
      {isNavBarCollapsed ? renderCollapsedNav() : renderExpandedNav()}
    </View>
  );
}
