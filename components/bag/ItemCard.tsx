import { ItemCardData } from "@/data/dataInterfaces";
import { View, Image } from "react-native";

interface Props {
  item: ItemCardData;
}

export default function ItemCard(props: Props) {
  return (
    <View className="p-5 rounded-lg bg-white justify-center items-center">
      <Image
        source={{ uri: props.item.imgUrl }}
        className="h-20 w-20"
        resizeMode="contain"
      />
    </View>
  );
}
