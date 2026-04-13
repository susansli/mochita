import { Image, View } from "react-native";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Text } from "../ui/text";
import { postcardDataAtom } from "@/atoms/travelAtoms";
import { useAtomValue } from "jotai";

interface Props {
  title?: string;
}

export default function TravelPostcardModal(props: Props) {
  const postcardData = useAtomValue(postcardDataAtom);

  return (
    <DialogContent className="sm">
      <DialogHeader>
        <DialogTitle>
          {props?.title ? props.title : "You received a postcard!"}
        </DialogTitle>
      </DialogHeader>
      <View className="grid gap-4 mt-[1rem]">
        {postcardData && (
          <View className="items-center">
            <Image
              source={{ uri: postcardData.imageUrl }}
              className="h-[14rem] w-full mb-[1rem] rounded-xl"
              resizeMode="cover"
            />
            <Text className="text-center text-sm mb-[1rem] italic">
              {postcardData.postcardText}
            </Text>
          </View>
        )}
      </View>
      <DialogFooter>
        <DialogClose asChild>
          <Button>
            <Text>Close</Text>
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
