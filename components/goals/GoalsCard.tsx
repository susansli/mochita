import { View } from "react-native";
import { Text } from "../ui/text";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Spacer from "../utility/Spacer";
import { GoalCardData } from "@/data/dataInterfaces";

interface Props {
  data: GoalCardData;
}

export default function GoalsCard(props: Props) {
  return (
    <View
      className={`flex-row w-full p-5 bg-stone-300 rounded-xl justify-center items-center ${props.data.isComplete && "border border-teal-500"}`}
    >
      <Text className=" w-[75%] text-wrap">{props.data.goal}</Text>
      <Spacer />
      <View
        className={`rounded-full p-5 ${props.data.isComplete ? "bg-teal-600" : "bg-stone-400"}`}
      >
        <FontAwesome
          name="check"
          size={20}
          color={props.data.isComplete ? "white" : "gray-500"}
        />
      </View>
    </View>
  );
}
