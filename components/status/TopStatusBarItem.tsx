import { View } from "react-native";
import { Text } from "../ui/text";

interface Props {
  text: string;
}

export default function TopStatusBarItem(props: Props) {
  return (
    <View className="bg-white p-2 rounded-lg">
      <Text>{props.text}</Text>
    </View>
  );
}
