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
import { Button } from "../ui/button";
import { Text } from "../ui/text";

interface Props {
  item: ItemCardData;
}

export default function BuyItemModal(props: Props) {
  const [inventory, setInventory] = useAtom<ItemCardData[]>(inventoryItemsAtom);
  const [sprouts, setSprouts] = useAtom<number>(topStatusSproutsAtom);

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
        <Button>
          <Text>Save changes</Text>
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
