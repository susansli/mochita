import { View } from "react-native";

interface Props {
    link?: string;
}

export default function BagSlot(props: Props) {
    return (
        <View className="h-[7rem] w-[7rem] rounded-full bg-white" />
    )
}