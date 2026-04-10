import {
  equippedItemsAtom,
  inventoryItemsAtom,
  isMaxHappinessNotifAtom,
} from "@/atoms/bagAtoms";
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
import { MAX_HAPPINESS } from "@/util/constants";
import { ItemType } from "@/util/enums";
import { returnItemType } from "@/util/helpers";
import { useAtom, useSetAtom } from "jotai";
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

export default function InventoryItemModal(props: Props) {
  const setInventory = useSetAtom(inventoryItemsAtom);
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

  async function consumeInventoryItem() {
    if (isButtonDisabled()) {
      return;
    }

    if (props.item.type === ItemType.TREAT) {
      if (props.item?.happiness && props.item?.qty) {
        const usedTreatRes = await InventoryApi.consumeTreat(
          props.item.id,
          props.item.qty,
        );

        if (!usedTreatRes) {
          Notifier.showNotification({
            title: `Error to use ${props.item.name}`,
            description: `Failed to use ${props.item.name}. Please try again.`,
            showAnimationDuration: 800,
            showEasing: Easing.bounce,
          });
          return;
        }

        const updatedUserData = await UserApi.getUser();

        if (!updatedUserData) {
          Notifier.showNotification({
            title: `Error to update user data`,
            description: `Failed to update user data after using ${props.item.name}. Please try again.`,
            showAnimationDuration: 800,
            showEasing: Easing.bounce,
          });
          return;
        }

        setHappiness(updatedUserData.happiness);

        if (updatedUserData.happiness === MAX_HAPPINESS) {
          setMaxHappinessNotif(true);
        } else {
          setMochitaSpeech("Thanks for the treat! I loved it!");
        }
      }

      const updatedInventory = await InventoryApi.getInventoryItems();
      if (updatedInventory) {
        setInventory(updatedInventory);
      }

      props.setClose();

      Notifier.showNotification({
        title: `Gave a ${returnItemType(props.item.type)} to Mochita!`,
        description: `Mochita's happiness increased by ${props.item.happiness} ❤️!`,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
      });
    } else {
      if (props.item.qty) {
        const updatedEquippedItems = await InventoryApi.equipBagItem(
          props.item.id,
        );
        if (updatedEquippedItems) {
          setEquippedItems(updatedEquippedItems);
        }

        const updatedInventory = await InventoryApi.getInventoryItems();
        if (updatedInventory) {
          setInventory(updatedInventory);
        }

        props.setClose();

        Notifier.showNotification({
          title: `Equipped ${props.item.name} to Mochita!`,
          description: `Mochita now has a ${returnItemType(props.item.type)} for her adventures!`,
          showAnimationDuration: 800,
          showEasing: Easing.bounce,
        });
      }
    }
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
        <Button
          disabled={isButtonDisabled()}
          onTouchEnd={async () => await consumeInventoryItem()}
        >
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
