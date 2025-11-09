import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ItemCardData } from "@/data/dataInterfaces";
import { useState } from "react";
import { Image, Pressable, View } from "react-native";
import EquippedItemModal from "./EquippedItemModal";

interface Props {
  item?: ItemCardData;
}

export default function BagSlot(props: Props) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <View className="h-[7rem] w-[7rem] rounded-full bg-white items-center justify-center">
      {props?.item && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Pressable>
              <Image
                source={{ uri: props.item.imgUrl }}
                className="h-[5rem] w-[5rem]"
                resizeMode="contain"
              />
            </Pressable>
          </DialogTrigger>
          <EquippedItemModal
            item={props.item}
            setClose={() => setOpen(false)}
          />
        </Dialog>
      )}
    </View>
  );
}
