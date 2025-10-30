import { goalsListAtom } from "@/atoms/goalsAtoms";
import { GoalCardData } from "@/data/dataInterfaces";
import { GOAL_SPROUTS, MAX_GOALS } from "@/util/constants";
import { useAtom } from "jotai";
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

interface Props {
  setClose: () => void;
}

export default function CreateGoalsModal(props: Props) {
  const [text, setText] = useState<string>("");
  const [goalList, setGoalList] = useAtom<GoalCardData[]>(goalsListAtom);

  function saveGoal() {
    const newGoal: GoalCardData = {
      index: goalList.length + 1,
      goal: text,
      isComplete: false,
    };
    setGoalList([...goalList, newGoal]);
    setText("");
    props.setClose();
    Notifier.showNotification({
      title: `New goal added!`,
      description: `Complete this goal today to earn ${GOAL_SPROUTS} 🌱!`,
      showAnimationDuration: 800,
      showEasing: Easing.bounce,
    });
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
          onTouchEnd={saveGoal}
        >
          <Text>{`${goalList.length === MAX_GOALS ? "Max Goals Reached" : "Save Goal"}`}</Text>
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
