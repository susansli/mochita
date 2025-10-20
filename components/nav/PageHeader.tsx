import FontAwesome from "@expo/vector-icons/FontAwesome";
import { View } from "react-native";
import Spacer from "../utility/Spacer";
import { Text } from "../ui/text";
import { useRouter } from "expo-router";

interface Props {
    title: string;
}

export default function PageHeader(props: Props) {

  const router = useRouter();

  return (
    <View className="flex-row justify-center items-center">
      <View
        className="px-3 py-2 rounded-full bg-stone-300 justify-center items-center"
        onTouchEnd={() => router.back()}
      >
        <FontAwesome name={"chevron-left"} size={20} color="teal" />
      </View>
      <Spacer />
      <Text className="text-2xl text-teal-700 font-medium">{props.title}</Text>
    </View>
  );
}
