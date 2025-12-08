import { Image, View } from "react-native";
import { DialogContent, DialogFooter, DialogClose } from "../ui/dialog";
import { Text } from "../ui/text";
import { Button } from "../ui/button";

interface Props {
  setClose: () => void;
}

export default function StartTravelModal(props: Props) {
  return (
    <DialogContent className="sm">
      <View className="grid gap-4 mt-[1rem]">
        <View className="items-center">
          <Image
            source={{ uri: "https://i.imgur.com/JSLrfOY.png" }}
            className="h-[9rem] w-[9rem] mb-[0.5rem]"
            resizeMode="contain"
          />
          <Text className="text-center">
            Send Mochita away on a trip?
          </Text>
          <Text className="text-center">
            Mochita will be away for 3 days and all equipped items will be used up!
          </Text>
        </View>
      </View>
      <DialogFooter className="flex-row gap-[6%]">
        <DialogClose asChild>
          <Button variant="outline" className="w-[47%]">
            <Text>Cancel</Text>
          </Button>
        </DialogClose>
        <Button className="w-[47%]">
            <Text>Yes</Text>
          </Button>
      </DialogFooter>
    </DialogContent>
  );
}
