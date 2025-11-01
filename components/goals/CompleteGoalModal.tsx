import { goalsListAtom } from "@/atoms/goalsAtoms";
import { mochitaSpeechAtom, topStatusSproutsAtom } from "@/atoms/homeAtoms";
import { GoalCardData } from "@/data/dataInterfaces";
import { GOAL_SPROUTS } from "@/util/constants";
import { useAtom, useSetAtom } from "jotai";
import { View } from "react-native";
import { Easing, Notifier } from "react-native-notifier";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "../ui/dialog";
import { Text } from "../ui/text";

interface Props {
  setClose: () => void;
  data: GoalCardData;
}

export default function CompleteGoalModal(props: Props) {
  const [goalList, setGoalList] = useAtom<GoalCardData[]>(goalsListAtom);
  const [sprouts, setSprouts] = useAtom<number>(topStatusSproutsAtom);
  const setMochitaSpeech = useSetAtom(mochitaSpeechAtom);

  function markGoalAsComplete() {
    const newGoals = [...goalList];
    newGoals.forEach((goal) => {
      if (!props.data.isComplete && goal.index === props.data.index) {
        goal.isComplete = true;
      }
    });
    props.setClose();
    Notifier.showNotification({
      title: `Yay! Goal completed!`,
      description: `You've earned ${GOAL_SPROUTS} 🌱 - Mochita is proud of you!`,
      showAnimationDuration: 800,
      showEasing: Easing.bounce,
    });

    setGoalList(newGoals);
    setSprouts(sprouts + GOAL_SPROUTS);
    setMochitaSpeech("One down! Keep up the great work, nya~💖")
    
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Complete A Goal</DialogTitle>
      </DialogHeader>
      <View>
        <Text>{`Complete this goal and earn ${GOAL_SPROUTS} 🌱. Keep up the awesome work!`}</Text>
      </View>
      <DialogFooter>
        <Button variant="outline" onTouchEnd={props.setClose}>
          <Text>Cancel</Text>
        </Button>
        <Button disabled={props.data.isComplete} onTouchEnd={() => !props.data.isComplete && markGoalAsComplete()}>
          <Text>{`${props.data.isComplete ? "Goal Already Completed" : "Mark as Complete"}`}</Text>
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
