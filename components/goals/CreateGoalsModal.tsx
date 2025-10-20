import { View } from "react-native";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { useAtom } from "jotai";
import { goalsListAtom } from "@/atoms/goalsAtoms";
import { GoalCardData } from "@/data/dataInterfaces";

interface Props {
    closeDialog: () => void;
}

export default function CreateGoalsModal(props: Props) {
  const [text, setText] = useState<string>("");
  const [goalList, setGoalList] = useAtom<GoalCardData[]>(goalsListAtom);

  function saveGoal() {
    const newGoal: GoalCardData = {
        index: goalList.length + 1,
        goal: text,
        isComplete: false
    }
    setGoalList([...goalList, newGoal]);
    setText("");
    props.closeDialog();
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
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
        <DialogClose asChild>
          <Button variant="outline">
            <Text>Cancel</Text>
          </Button>
        </DialogClose>
        <Button onTouchEnd={saveGoal}>
          <Text>Save changes</Text>
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
