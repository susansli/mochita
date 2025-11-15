import { equippedItemsAtom, inventoryItemsAtom, isMaxHappinessNotifAtom } from "@/atoms/bagAtoms";
import { mochitaSpeechAtom, topStatusHappinessAtom } from "@/atoms/homeAtoms";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EquippedItems, ItemCardData } from "@/data/dataInterfaces";
import { ItemType } from "@/util/enums";
import { returnItemType } from "@/util/helpers";
import { useAtom, useSetAtom } from "jotai";
import { Image, View } from "react-native";
import { Easing, Notifier } from "react-native-notifier";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

interface Props {
  item: ItemCardData;
  setClose: () => void;
}

export default function InventoryItemModal(props: Props) {
  const [inventory, setInventory] = useAtom<ItemCardData[]>(inventoryItemsAtom);
  const [happiness, setHappiness] = useAtom<number>(topStatusHappinessAtom);
  const [equippedItems, setEquippedItems] =
    useAtom<EquippedItems>(equippedItemsAtom);
  const setMaxHappinessNotif = useSetAtom(isMaxHappinessNotifAtom);
  const setMochitaSpeech = useSetAtom(mochitaSpeechAtom);
  

  function renderItemDescription() {
    if (props.item.type === ItemType.TREAT) {
      return `Give this ${props.item.name} to Mochita and increase happiness by ${props.item.happiness} ❤️!`;
    } else {
      return `Equip this ${props.item.name} so Mochita can go on adventures!`;
    }
  }

  function isButtonDisabled() {
    if (props.item.type !== ItemType.TREAT) {
      if (props.item.type in equippedItems) {
        return true;
      }
    }
    return false;
  }

  function useInventoryItem() {
    if (isButtonDisabled()) {
      return;
    }

    let newInventory = [...inventory];

    if (props.item.type === ItemType.TREAT) {
      props.item?.happiness && setHappiness(happiness + props.item.happiness);

      props.setClose();

      Notifier.showNotification({
        title: `Gave a ${returnItemType(props.item.type)} to Mochita!`,
        description: `Mochita's happiness increased by ${props.item.happiness} ❤️!`,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
      });
    } else {
      const newEquippedItems = { ...equippedItems };

      newEquippedItems[props.item.type] = props.item;

      setEquippedItems(newEquippedItems);

      props.setClose();

      Notifier.showNotification({
        title: `Equipped ${props.item.name} to Mochita!`,
        description: `Mochita now has a ${returnItemType(props.item.type)} for her adventures!`,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
      });
    }

    if (props.item.qty === 1) {
      // remove item from inventory
      newInventory = newInventory.filter(
        (item) => item.name !== props.item.name
      );
    } else {
      // decrease qty by 1
      newInventory.forEach((item) => {
        if (item.name === props.item.name && item?.qty) {
          item.qty--;
        }
      });
    }

    setInventory(newInventory);
  }

  return (
    <DialogContent className="sm">
      <DialogHeader>
        <DialogTitle>{`Use ${returnItemType(props.item.type)}?`}</DialogTitle>
        <DialogDescription>
          <Text>{renderItemDescription()}</Text>
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
        <Text className="font-semibold">{`🎒 Qty: ${props.item.qty}`}</Text>
        <Text>
          {isButtonDisabled()
            ? "You need to free this slot before you can equip another item."
            : `Would you like to ${props.item.happiness ? "use" : "equip"} this item?`}
        </Text>
      </View>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">
            <Text>Cancel</Text>
          </Button>
        </DialogClose>
        <Button disabled={isButtonDisabled()} onTouchEnd={useInventoryItem}>
          <Text>
            {isButtonDisabled()
              ? `${returnItemType(props.item.type)} Already Equipped!`
              : `${props.item.happiness ? "Use" : "Equip"} ${props.item.name}`}
          </Text>
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
