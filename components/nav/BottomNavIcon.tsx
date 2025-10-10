import FontAwesome from "@expo/vector-icons/FontAwesome";
import { View } from "react-native";
import { Text } from "../ui/text";

interface Props {
  name: string;
  label: string;
}

type FAName = keyof typeof FontAwesome.glyphMap;

export default function BottomNavIcon(props: Props) {
  return (
    <View className="flex-col gap-2 justify-center items-center">
      <FontAwesome name={props.name as FAName} size={20} color="blue" />
      <Text className="text-xs">{props.label}</Text>
    </View>
  );
}
