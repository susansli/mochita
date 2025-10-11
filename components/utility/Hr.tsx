import { View } from "react-native";

interface Props {
    color?: string; // border-col-val
}

export default function Hr(props: Props) {
    return <View className={`border-b my-4 ${props?.color ?? "border-gray-300"}`} />;
}