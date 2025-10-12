import { goalsListAtom } from "@/atoms/goalsAtoms";
import { GoalCardData } from "@/data/dataInterfaces";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAtom } from "jotai";
import { View } from "react-native";
import { Text } from "../ui/text";
import Spacer from "../utility/Spacer";
import { topStatusSproutsAtom } from "@/atoms/topStatusAtoms";
import { GOAL_SPROUTS } from "@/util/constants";

interface Props {
  data: GoalCardData;
}

export default function GoalsCard(props: Props) {
  const [goalList, setGoalList] = useAtom<GoalCardData[]>(goalsListAtom);
  const [sprouts, setSprouts] = useAtom<number>(topStatusSproutsAtom);

  function markGoalAsComplete() {
    const newGoals = [...goalList];
    newGoals.forEach((goal) => {
        if (!props.data.isComplete && goal.index === props.data.index) {
            goal.isComplete = true;
        }
    });
    setGoalList(newGoals);
    setSprouts(sprouts + GOAL_SPROUTS);
  }

  return (
    <View
      className={`flex-row w-full p-5 bg-stone-300 rounded-xl justify-center items-center ${props.data.isComplete && "border border-teal-500"}`}
      onTouchEnd={markGoalAsComplete}
    >
      <Text className=" w-[75%] text-wrap">{props.data.goal}</Text>
      <Spacer />
      <View
        className={`rounded-full p-5 ${props.data.isComplete ? "bg-teal-600" : "bg-stone-400"}`}
      >
        <FontAwesome
          name="check"
          size={20}
          color={props.data.isComplete ? "white" : "gray"}
        />
      </View>
    </View>
  );
}
