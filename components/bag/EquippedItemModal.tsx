import { equippedItemsAtom, inventoryItemsAtom } from "@/atoms/bagAtoms";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { EquippedItems, ItemCardData } from "@/data/dataInterfaces";
import { returnItemType } from "@/util/helpers";
import { useAtom } from "jotai";
import { Image, View } from "react-native";
import { Easing, Notifier } from "react-native-notifier";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

interface Props {
  item: ItemCardData;
  setClose: () => void;
}

export default function EquippedItemModal(props: Props) {
  const [inventory, setInventory] = useAtom<ItemCardData[]>(inventoryItemsAtom);
  const [equippedItems, setEquippedItems] =
    useAtom<EquippedItems>(equippedItemsAtom);

  function unequipItem() {
    const newEquippedItems = { ...equippedItems };
    const newInventory = [...inventory];

    delete newEquippedItems[props.item.type];
    const itemIndex = newInventory.findIndex(
      (item) => item.name === props.item.name
    );
    if (itemIndex >= 0) {
      newInventory[itemIndex]?.qty && newInventory[itemIndex].qty++;
    } else {
      newInventory.push(props.item);
    }
    props.setClose();

    setEquippedItems(newEquippedItems);
    setInventory(newInventory);

    Notifier.showNotification({
        title: `Unequipped ${props.item.name} from Mochita!`,
        description: `The item has been returned to your inventory.`,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
      });
  }

  return (
    <DialogContent className="sm">
      <DialogHeader>
        <DialogTitle>{`Unequip ${returnItemType(props.item.type)}?`}</DialogTitle>
        <DialogDescription>
          <Text>{`This ${props.item.name} is currently equipped to Mochita.`}</Text>
        </DialogDescription>
      </DialogHeader>
      <View className="grid gap-4">
        <View className="items-center">
          <Image
            source={{ uri: props.item.imgUrl }}
            className="h-[10rem] w-[10rem] mb-2"
            resizeMode="contain"
          />
        </View>
        <Text>Unequip this item to equip another.</Text>
      </View>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">
            <Text>Cancel</Text>
          </Button>
        </DialogClose>
        <Button onTouchEnd={unequipItem}>
          <Text>Return Item to Bag</Text>
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
