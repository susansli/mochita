import PageHeader from "@/components/nav/PageHeader";
import { Text } from "@/components/ui/text";
import Spacer from "@/components/utility/Spacer";
import { withPageWrapper } from "@/components/wrappers/withPageWrapper";
import { View, Image, Pressable } from "react-native";

function TravelDetails() {
  return (
    <View className="flex-1 bg-teal-100 p-5">
      <PageHeader
        title="Beachside Adventure"
        arrowBg="bg-teal-500"
        arrowColor="white"
      />

      <View className="gap-[1rem] my-[1.5rem] p-[1.25rem] bg-teal-500 rounded-lg">
        <Image
          source={{ uri: "https://i.imgur.com/zK6xFrv.png" }}
          className="h-[10rem] w-full rounded-lg"
          resizeMode="cover"
        />
        <Pressable className="flex-row items-center">
            <Text className="text-white font-bold">Postcard #1</Text>
            <Spacer />
            <Text className="text-white font-bold">12/10/2025</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default withPageWrapper(TravelDetails);
