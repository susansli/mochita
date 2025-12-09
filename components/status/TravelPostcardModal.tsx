import { Image, View } from "react-native";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Text } from "../ui/text";

export default function TravelPostcardModal() {
  return (
    <DialogContent className="sm">
      <DialogHeader>
        <DialogTitle>You received a postcard!</DialogTitle>
      </DialogHeader>
      <View className="grid gap-4 mt-[1rem]">
        <View className="items-center">
          <Image
            source={{ uri: "https://i.imgur.com/zK6xFrv.png" }}
            className="h-[14rem] w-full mb-[1rem] rounded-xl"
            resizeMode="cover"
          />
          <Text className="text-center mb-[1rem] italic">
            {`"It's so sunny and bright here, I almost forgot how rainy it is where you are. The water looks clear, but there's no way I'm getting my fur wet... playing on the beach is so fun though! Miss you!" — Mochita`}
          </Text>
        </View>
      </View>
      <DialogFooter>
        <DialogClose asChild>
          <Button>
            <Text>Close</Text>
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
