import { isNavbarCollapsedAtom } from "@/atoms/navAtoms";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useSetAtom } from "jotai";
import { View } from "react-native";
import { Text } from "../ui/text";

interface Props {
  name: string;
  label: string;
}

type FAName = keyof typeof FontAwesome.glyphMap;

export default function BottomNavIcon(props: Props) {
  const setIsNavBarCollapsed = useSetAtom(isNavbarCollapsedAtom);

  return (
    <View
      className="flex-col gap-2 justify-center items-center"
      onTouchEnd={() => {
        if (props.label === "Back") {
          setIsNavBarCollapsed(true);
        }
      }}
    >
      <FontAwesome name={props.name as FAName} size={20} color="teal" />
      <Text className="text-xs">{props.label}</Text>
    </View>
  );
}
