import PageHeader from "@/components/nav/PageHeader";
import { Text } from "@/components/ui/text";
import Spacer from "@/components/utility/Spacer";
import { withPageWrapper } from "@/components/wrappers/withPageWrapper";
import { useState } from "react";
import { View, Image, Pressable } from "react-native";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import TravelPostcardModal from "@/components/status/TravelPostcardModal";

function TravelDetails() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <View className="flex-1 bg-teal-100 p-5">
      <PageHeader
        title="Beachside Adventure"
        arrowBg="bg-teal-500"
        arrowColor="white"
      />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Pressable className="gap-[1rem] my-[1.5rem] p-[1.25rem] bg-teal-500 rounded-lg">
            <Image
              source={{ uri: "https://i.imgur.com/zK6xFrv.png" }}
              className="h-[10rem] w-full rounded-lg"
              resizeMode="cover"
            />
            <View className="flex-row items-center">
              <Text className="text-white font-bold">Postcard #1</Text>
              <Spacer />
              <Text className="text-white font-bold">12/10/2025</Text>
            </View>
          </Pressable>
        </DialogTrigger>
        <TravelPostcardModal title="Postcard #1: 12/10/2025" />
      </Dialog>
    </View>
  );
}

export default withPageWrapper(TravelDetails);
