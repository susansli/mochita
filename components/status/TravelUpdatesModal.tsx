import { Image, View } from "react-native";
import { Button } from "../ui/button";
import { DialogClose, DialogContent, DialogFooter } from "../ui/dialog";
import { Text } from "../ui/text";

interface Props {
  setClose: () => void;
}

export default function TravelUpdatesModal(props: Props) {
  return (
    <DialogContent className="sm">
      <View className="grid gap-4 mt-[1rem]">
        <View className="items-center">
          <Image
            source={{ uri: "https://i.imgur.com/g6X3RWh.png" }}
            className="h-[12rem] w-full mb-[1rem]"
            resizeMode="contain"
          />
          <Text className="text-center mb-[1rem]">
            {`Mochita is currently on a sailboat! She's decided on a seaside location for this trip.`}
          </Text>
          <Text className="text-center mb-[1rem]">
            {`Mochita: "Wow, the waves look so pretty... maybe I should take some pictures."`}
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
