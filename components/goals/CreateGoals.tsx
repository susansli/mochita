import { View } from "react-native";
import { Dialog, DialogTrigger } from "../ui/dialog";
import Spacer from "../utility/Spacer";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import CreateGoalsModal from "./CreateGoalsModal";

export default function CreateGoals() {
  return (
    <View className="flex-row mb-5">
      <Spacer />
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-teal-600">
            <Text className="w-20 text-center">+ Create</Text>
          </Button>
        </DialogTrigger>
        <CreateGoalsModal />
      </Dialog>
    </View>
  );
}
