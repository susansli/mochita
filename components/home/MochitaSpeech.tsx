import { View } from "react-native";
import { Text } from "../ui/text";

interface Props {
  speech?: string;
}

export default function MochitaSpeech(props: Props) {
  return (
    <>
      {props?.speech && props.speech.length && (
        <View className="h-[7.5rem] w-[15rem] absolute bg-white mt-[23.5rem] ml-[5rem] items-center justify-center rounded-full">
          <Text>{props.speech}</Text>
          <View
            pointerEvents="none"
            className="
                    absolute
                    -bottom-3 left-1/2 -translate-x-1/2
                    w-0 h-0
                    border-l-[12px] border-r-[12px] border-t-[14px]
                    border-l-transparent border-r-transparent border-t-white
                  "
          />
        </View>
      )}
    </>
  );
}
