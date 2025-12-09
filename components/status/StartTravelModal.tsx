import { equippedItemsAtom } from "@/atoms/bagAtoms";
import { topStatusHappinessAtom } from "@/atoms/homeAtoms";
import { isTravelingAtom } from "@/atoms/travelAtoms";
import { useAtom, useSetAtom } from "jotai";
import { Image, View } from "react-native";
import { Easing, Notifier } from "react-native-notifier";
import { Button } from "../ui/button";
import { DialogClose, DialogContent, DialogFooter } from "../ui/dialog";
import { Text } from "../ui/text";

interface Props {
  setClose: () => void;
}

export default function StartTravelModal(props: Props) {
  const [equippedItems, setEquippedItems] = useAtom(equippedItemsAtom);
  const setIsTraveling = useSetAtom(isTravelingAtom);
  const setHappiness = useSetAtom(topStatusHappinessAtom);

  function renderItemDescriptions() {
    return Object.keys(equippedItems).map((key, i) => {
      return (
        <Text key={i} className="italic text-sm">
          {equippedItems[key].effects[0]}
        </Text>
      );
    });
  }

  function confirmTravel() {
    setIsTraveling(true);
    setEquippedItems({});
    setHappiness(0);
    props.setClose();
    Notifier.showNotification({
      title: `Mochita has left on a trip!`,
      description: `She will be back in 3 days. Remember to stay up to date with her adventures ❤️`,
      showAnimationDuration: 1100,
      showEasing: Easing.bounce,
    });
  }

  return (
    <DialogContent className="sm">
      <View className="grid gap-4 mt-[1rem]">
        <View className="items-center">
          <Image
            source={{ uri: "https://i.imgur.com/JSLrfOY.png" }}
            className="h-[10rem] w-[10rem]"
            resizeMode="contain"
          />
          <View className="my-[1rem] p-[1rem] bg-teal-200 rounded-lg w-full items-center">
            {renderItemDescriptions()}
          </View>
          <Text className="text-center mb-[1rem]">
            Send Mochita away on a trip?
          </Text>
          <Text className="text-center mb-[1rem]">
            Mochita will be away for 3 days and all equipped items will be used
            up. Double check to make sure everything is set!
          </Text>
        </View>
      </View>
      <DialogFooter className="flex-row gap-[6%]">
        <DialogClose asChild>
          <Button variant="outline" className="w-[47%]">
            <Text>Cancel</Text>
          </Button>
        </DialogClose>
        <Button className="w-[47%]" onTouchEnd={confirmTravel}>
          <Text>Yes!</Text>
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
