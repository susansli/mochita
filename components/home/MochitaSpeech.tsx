import { mochitaSpeechAtom } from "@/atoms/homeAtoms";
import { useAtom, useAtomValue } from "jotai";
import { Pressable, View } from "react-native";
import { Text } from "../ui/text";

export default function MochitaSpeech() {
  const [mochitaSpeech, setMochitaSpeech] = useAtom<string>(mochitaSpeechAtom);
  return (
    <>
      {mochitaSpeech.length ? (
        <Pressable
          onTouchEnd={() => setMochitaSpeech("")}
          className="p-4 h-[7.5rem] w-[15rem] absolute bg-white mt-[23.5rem] ml-[5rem] items-center justify-center rounded-full"
        >
          <Text className="text-sm text-center">{mochitaSpeech}</Text>
          <View
            pointerEvents="none"
            className="
                    absolute
                    -bottom-3 left-1/2 -translate-x-1/2
                    w-0 h-0
                    border-l-[0.75rem] border-r-[0.75rem] border-t-[0.875rem]
                    border-l-transparent border-r-transparent border-t-white
                  "
          />
        </Pressable>
      ) : (
        <></>
      )}
    </>
  );
}
