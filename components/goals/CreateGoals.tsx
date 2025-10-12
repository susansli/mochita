import { View } from "react-native";
import { Dialog, DialogTrigger } from "../ui/dialog";
import Spacer from "../utility/Spacer";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import CreateGoalsModal from "./CreateGoalsModal";
import { useState } from "react";

export default function CreateGoals() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <View className="flex-row mb-5">
      <Spacer />
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button className="bg-teal-600" onTouchEnd={() => setOpen(true)}>
            <Text className="w-20 text-center">+ Create</Text>
          </Button>
        </DialogTrigger>
        <CreateGoalsModal closeDialog={() => setOpen(false)} />
      </Dialog>
    </View>
  );
}
