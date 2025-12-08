import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Image, View } from "react-native";
import { Text } from "../ui/text";
import { Button } from "../ui/button";

interface Props {
  setClose: () => void;
}

export default function TravelNotifModal(props: Props) {
  return (
    <DialogContent className="sm">
      <DialogHeader>
        <DialogTitle></DialogTitle>
        <DialogDescription>
          <Text></Text>
        </DialogDescription>
      </DialogHeader>
      <View className="grid gap-4">
        <View className="items-center"></View>
        <Text>Hello World</Text>
      </View>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">
            <Text>Cancel</Text>
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
