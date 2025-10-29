import { ItemCardData } from "@/data/dataInterfaces";
import { Image, View } from "react-native";

interface Props {
  item?: ItemCardData;
}

export default function BagSlot(props: Props) {
  return (
    <View className="h-[7rem] w-[7rem] rounded-full bg-white items-center justify-center">
      {props?.item && (
        <Image
          source={{ uri: props.item.imgUrl }}
          className="h-[5rem] w-[5rem]"
          resizeMode="contain"
        />
      )}
    </View>
  );
}
