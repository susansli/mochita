import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { View } from "react-native";
import { Text } from "../ui/text";
import { Button } from "../ui/button";

export default function BuyItemModal() {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          <Text>
            Make changes to your profile here. Click save when you&apos;re done.
          </Text>
        </DialogDescription>
      </DialogHeader>
      <View className="grid gap-4">
        <Text>Hello World</Text>
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
