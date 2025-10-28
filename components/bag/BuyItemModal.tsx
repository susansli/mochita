import { inventoryItemsAtom } from "@/atoms/bagAtoms";
import { topStatusSproutsAtom } from "@/atoms/topStatusAtoms";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ItemCardData } from "@/data/dataInterfaces";
import { returnItemType } from "@/util/helpers";
import { useAtom } from "jotai";
import { Image, View } from "react-native";
import { Easing, Notifier, NotifierComponents } from "react-native-notifier";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

interface Props {
  item: ItemCardData;
  setClose: () => void;
}

export default function BuyItemModal(props: Props) {
  const [inventory, setInventory] = useAtom<ItemCardData[]>(inventoryItemsAtom);
  const [sprouts, setSprouts] = useAtom<number>(topStatusSproutsAtom);

  function buyItem() {
    if (props?.item?.sproutCost && props.item.sproutCost <= sprouts) {
      const newInventory = [...inventory];
      const itemIndex = newInventory.findIndex(
        (item) => item.name === props.item.name && item.qty && item.qty++
      );
      if (itemIndex < 0) {
        const newItem: ItemCardData = {
          name: props.item.name,
          imgUrl: props.item.imgUrl,
          type: props.item.type,
          qty: 1,
          ...(props.item.happiness != null
            ? { happiness: props.item.happiness }
            : {}),
        };

        newItem.sproutCost && delete newItem.sproutCost;
        newInventory.push(newItem);
      }
      setInventory(newInventory);
      setSprouts(sprouts - props.item.sproutCost);
      props.setClose();
      Notifier.showNotification({
        title: `Purchased ${returnItemType(props.item.type)}!`,
        description: `The item was added to your inventory for ${props.item.sproutCost} 🌱!`,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: "success",
        },
      });
    } else {
      props.setClose();
      Notifier.showNotification({
        title: `Failed to Purchase ${returnItemType(props.item.type)}...`,
        description: `You don't have enough sprouts to make this purchase.`,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
        hideOnPress: true,
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: "error",
        },
      });
    }
  }

  return (
    <DialogContent className="sm">
      <DialogHeader>
        <DialogTitle>{`Purchase ${returnItemType(props.item.type)}?`}</DialogTitle>
        <DialogDescription>
          <Text>{`🌱 Current Sprouts: ${sprouts}`}</Text>
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
        <Text className="font-semibold">{`🏷️ Name: ${props.item.name}`}</Text>
        <Text className="font-semibold">{`🪙 Cost: ${props.item.sproutCost}`}</Text>
        <Text>Would you like to purchase this item?</Text>
      </View>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">
            <Text>Cancel</Text>
          </Button>
        </DialogClose>
        <Button
          disabled={
            props?.item?.sproutCost && props.item.sproutCost > sprouts
              ? true
              : false
          }
          onTouchEnd={buyItem}
        >
          <Text>Make Purchase</Text>
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
