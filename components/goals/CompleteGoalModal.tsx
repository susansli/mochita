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
import GoalsApi from "@/api/Goals";
import { User } from "lucide-react-native";
import UserApi from "@/api/User";

interface Props {
  setClose: () => void;
  data: GoalCardData;
}

export default function CompleteGoalModal(props: Props) {
  const [goalList, setGoalList] = useAtom<GoalCardData[]>(goalsListAtom);
  const setMochitaSpeech = useSetAtom(mochitaSpeechAtom);

  async function markGoalAsComplete() {

    const completedGoal = await GoalsApi.markGoalAsComplete(props.data.goalId);

    if (!completedGoal) {
      Notifier.showNotification({
        title: `Uh oh! Something went wrong.`,
        description: `Please try again.`,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
      });

      props.setClose();

      return;
    }

    const date = (new Date()).toLocaleDateString();

    const updatedGoals = await GoalsApi.getGoalsByDate(date);

    if (!updatedGoals) {
      Notifier.showNotification({
        title: `Uh oh! Something went wrong.`,
        description: `Please try again.`,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
      });

      props.setClose();

      return;
    }

    setGoalList([...updatedGoals]);

    Notifier.showNotification({
      title: `Yay! Goal completed!`,
      description: `You've earned ${GOAL_SPROUTS} 🌱 - Mochita is proud of you!`,
      showAnimationDuration: 800,
      showEasing: Easing.bounce,
    });

    props.setClose();
    
    setMochitaSpeech("One down! Keep up the great work, nya~💖");
    
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
        <Button disabled={props.data.isComplete} onTouchEnd={async () => !props.data.isComplete && await markGoalAsComplete()}>
          <Text>{`${props.data.isComplete ? "Goal Already Completed" : "Mark as Complete"}`}</Text>
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
