import { goalsListAtom } from "@/atoms/goalsAtoms";
import { mochitaSpeechAtom } from "@/atoms/homeAtoms";
import { GoalCardData } from "@/data/dataInterfaces";
import { GOAL_SPROUTS, MAX_GOALS } from "@/util/constants";
import { useAtom, useSetAtom } from "jotai";
import { useState } from "react";
import { View } from "react-native";
import { Easing, Notifier } from "react-native-notifier";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "../ui/dialog";
import { Text } from "../ui/text";
import { Textarea } from "../ui/textarea";
import GoalsApi from "@/api/Goals";

interface Props {
  setClose: () => void;
}

export default function CreateGoalsModal(props: Props) {
  const [text, setText] = useState<string>("");
  const [goalList, setGoalList] = useAtom<GoalCardData[]>(goalsListAtom);
  const setMochitaSpeech = useSetAtom(mochitaSpeechAtom);

  async function saveGoal() {

    const date = (new Date()).toLocaleDateString();
    const newGoal = await GoalsApi.createGoal(date, text);

    if (!newGoal) {
      Notifier.showNotification({
        title: `Error creating goal`,
        description: `Please try again.`,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
      });
      return;
    }

    const goalList = await GoalsApi.getGoalsByDate(date);

    if (!goalList) {
      Notifier.showNotification({
        title: `Error fetching goals`,
        description: `Please try again.`,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
      });
      return;
    }

    setGoalList([...goalList]);
    setText("");

    props.setClose();

    Notifier.showNotification({
      title: `New goal added!`,
      description: `Complete this goal today to earn ${GOAL_SPROUTS} 🌱!`,
      showAnimationDuration: 800,
      showEasing: Easing.bounce,
    });

    setMochitaSpeech("Wow, a new goal~💖 good luck, friend!");

  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader >
        <DialogTitle>Create A New Goal!</DialogTitle>
        <DialogDescription>
          You can make and set 5 goals a day. Completion of each goal will earn
          you sprouts!
        </DialogDescription>
      </DialogHeader>
      <View>
        <Textarea
          value={text}
          onChangeText={setText}
          placeholder="Type your goal here..."
          className="max-w-[345px]"
        />
      </View>
      <DialogFooter>
        <Button variant="outline" onTouchEnd={props.setClose}>
          <Text>Cancel</Text>
        </Button>
        <Button
          disabled={goalList.length === MAX_GOALS || !text.length}
          onTouchEnd={async () => await saveGoal()}
        >
          <Text>{`${goalList.length === MAX_GOALS ? "Max Goals Reached" : "Save Goal"}`}</Text>
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
