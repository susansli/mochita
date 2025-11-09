import { GoalCardData } from "@/data/dataInterfaces";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, View } from "react-native";
import { Text } from "../ui/text";
import Spacer from "../utility/Spacer";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import CompleteGoalModal from "./CompleteGoalModal";
interface Props {
  data: GoalCardData;
}

export default function GoalsCard(props: Props) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pressable
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
              color={props.data.isComplete ? "white" : "gray"}
            />
          </View>
        </Pressable>
      </DialogTrigger>
      <CompleteGoalModal data={props.data} setClose={() => setOpen(false)} />
    </Dialog>
  );
}
