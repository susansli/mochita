import {
    DialogClose,
    DialogContent,
    DialogFooter,
} from "@/components/ui/dialog";
import { Image, View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

interface Props {
  setClose: () => void;
}

export default function TravelNotifModal(props: Props) {
  return (
    <DialogContent className="sm">
      <View className="grid gap-4 mt-[1rem]">
        <View className="items-center">
          <Image
            source={{ uri: "https://i.imgur.com/iqoeh28.png" }}
            className="h-[11rem] w-[11rem] mb-2"
            resizeMode="contain"
          />
          <Text className="text-center">
            Mochita is happy enough to travel ❤️
          </Text>
          <Text className="text-center">
            Make sure you have her bag slots filled!
          </Text>
        </View>
      </View>
      <DialogFooter>
        <DialogClose asChild>
          <Button>
            <Text>Got It!</Text>
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
