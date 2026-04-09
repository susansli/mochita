import { inventoryItemsAtom } from "@/atoms/bagAtoms";
import { topStatusSproutsAtom } from "@/atoms/homeAtoms";
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
import { Easing, Notifier } from "react-native-notifier";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import InventoryApi from "@/api/Inventory";
import UserApi from "@/api/User";

interface Props {
  item: ItemCardData;
  setClose: () => void;
}

export default function BuyItemModal(props: Props) {
  const [inventory, setInventory] = useAtom<ItemCardData[]>(inventoryItemsAtom);
  const [sprouts, setSprouts] = useAtom<number>(topStatusSproutsAtom);

  function isButtonDisabled() {
    return (
      (props?.item?.sproutCost && props.item.sproutCost > sprouts) || false
    );
  }

  async function buyItem() {
    if (isButtonDisabled()) {
      return;
    }

    if (props?.item?.sproutCost && props.item.sproutCost <= sprouts) {
      const newInventoryAfterPurchase = await InventoryApi.buyItem(
        props.item.id,
      );
      const updatedUser = await UserApi.getUser();

      if (newInventoryAfterPurchase) {
        setInventory(newInventoryAfterPurchase);
      }

      if (updatedUser) {
        setSprouts(updatedUser.sprouts);
      }

      props.setClose();
      Notifier.showNotification({
        title: `Purchased ${returnItemType(props.item.type)}!`,
        description: `Added the ${props.item.name} to your inventory!`,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
        hideOnPress: true,
      });

    } else {
      props.setClose();
      Notifier.showNotification({
        title: `Failed to Purchase ${returnItemType(props.item.type)}...`,
        description: `You don't have enough sprouts to make this purchase.`,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
        hideOnPress: true,
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
      <View className="gap-4">
        <View className="items-center">
          <Image
            source={{ uri: props.item.imgUrl }}
            className="h-[10rem] w-[10rem] mb-2"
            resizeMode="contain"
          />
        </View>
        <Text className="font-semibold">{`🏷️ Name: ${props.item.name}`}</Text>
        <Text className="font-semibold">{`🪙 Cost: ${props.item.sproutCost}`}</Text>
        <View className="w-full rounded-lg bg-teal-200 p-[0.5rem] items-center">
          <Text
            className={`text-sm italic text-center ${!props.item?.happiness ? "mb-[0.25rem]" : ""}`}
          >
            {props.item.flavorText}
          </Text>
          <>
            {!props.item?.happiness && (
              <Text className="text-sm font-semibold italic text-center">
                ✨ {props.item.effectText}
              </Text>
            )}
          </>
        </View>
        <Text>Would you like to purchase this item?</Text>
      </View>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">
            <Text>Cancel</Text>
          </Button>
        </DialogClose>
        <Button
          disabled={isButtonDisabled()}
          onTouchEnd={async () => await buyItem()}
        >
          <Text>Make Purchase</Text>
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
