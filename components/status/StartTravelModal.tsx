import { Image, View } from "react-native";
import { DialogContent, DialogFooter, DialogClose } from "../ui/dialog";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { useAtomValue } from "jotai";
import { equippedItemsAtom } from "@/atoms/bagAtoms";

interface Props {
  setClose: () => void;
}

export default function StartTravelModal(props: Props) {

  const equippedItems = useAtomValue(equippedItemsAtom);

  function renderItemDescriptions() {
    return Object.keys(equippedItems).map((key, i) => {
      return (
        <Text key={i} className="italic text-sm">{equippedItems[key].effects[0]}</Text>
      )
    })
  }

  return (
    <DialogContent className="sm">
      <View className="grid gap-4 mt-[1rem]">
        <View className="items-center">
          <Image
            source={{ uri: "https://i.imgur.com/JSLrfOY.png" }}
            className="h-[9rem] w-[9rem]"
            resizeMode="contain"
          />
          <View className="my-[1rem] p-[1rem] bg-teal-200 rounded-lg w-full items-center">
            {renderItemDescriptions()}
          </View>
          <Text className="text-center mb-[1rem]">
            Send Mochita away on a trip?
          </Text>
          <Text className="text-center mb-[1rem]">
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
