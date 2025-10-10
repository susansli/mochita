import { View } from "react-native";
import { Text } from "../ui/text";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface Props {
  name: string;
  label: string;
}

type FAName = keyof typeof FontAwesome.glyphMap;

export default function BottomNavIcon(props: Props) {
  return (
    <View className="flex-col gap-2">
      <FontAwesome name={props.name as FAName} size={32} color="blue" />
      <Text>{props.label}</Text>
    </View>
  );
}
