import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ItemCardData } from "@/data/dataInterfaces";
import { ItemType } from "@/util/enums";
import { useState } from "react";
import { Image, Pressable, View } from "react-native";
import { Text } from "../ui/text";
import BuyItemModal from "./BuyItemModal";
import { returnItemType } from "@/util/helpers";

interface Props {
  item: ItemCardData;
}

export default function ItemCard(props: Props) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pressable className="rounded-lg bg-white justify-center items-center">
          <View className="mt-2 w-16 p-2 bg-teal-300 mr-[5.6rem] rounded-r-lg">
            <Text className="text-xs text-nowrap">{returnItemType(props.item.type)}</Text>
          </View>
          <Image
            source={{ uri: props.item.imgUrl }}
            className="h-20 w-20 mb-2"
            resizeMode="contain"
          />
          <View className="p-5 bg-teal-600 w-full rounded-b-lg">
            <Text className="text-md color-white font-semibold text-center">
              {props.item.name}
            </Text>
            <Text className="text-sm color-white text-center">
              {`${props.item.sproutCost} 🌱`}
            </Text>
          </View>
        </Pressable>
      </DialogTrigger>
      <BuyItemModal item={props.item} setClose={() => setOpen(false)} />
    </Dialog>
  );
}
