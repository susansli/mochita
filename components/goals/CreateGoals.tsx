import { useState } from "react";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Text } from "../ui/text";
import Spacer from "../utility/Spacer";
import CreateGoalsModal from "./CreateGoalsModal";

export default function CreateGoals() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <View className="flex-row mb-5">
      <Spacer />
      <Dialog open={open}  onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-teal-600" onTouchEnd={() => setOpen(true)}>
            <Text className="w-20 text-center">+ Create</Text>
          </Button>
        </DialogTrigger>
        <CreateGoalsModal setClose={() => setOpen(false)} />
      </Dialog>
    </View>
  );
}
