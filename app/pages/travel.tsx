import PageHeader from "@/components/nav/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import Spacer from "@/components/utility/Spacer";
import { withPageWrapper } from "@/components/wrappers/withPageWrapper";
import { useRouter } from "expo-router";
import { View, Image, Pressable } from "react-native";

function Travel() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-teal-100 p-5">
      <PageHeader
        title="Travel Stories"
        arrowBg="bg-teal-500"
        arrowColor="white"
      />

      <View className="flex-row items-center w-100% my-[1.5rem]">
        <Input
          className="!bg-white border-teal-500 !w-[75%]"
          keyboardType="default"
          placeholder="Trip title..."
        />
        <Spacer />
        <Button className="bg-teal-500">
          <Text>Search</Text>
        </Button>
      </View>

      {/* Placeholder */}
      <View>
        <View className="bg-teal-500 p-[1rem] w-full rounded-lg flex-row gap-[1rem] items-center">
          <Image
            source={{ uri: "https://i.imgur.com/JSLrfOY.png" }}
            className="h-[4rem] w-[4rem]"
            resizeMode="contain"
          />

          <Pressable className="flex-1" onTouchEnd={() => router.push("/pages/travel-details")}>
            <Text className="text-white text-lg font-bold mb-[1rem]">
              Beachside Adventure
            </Text>
            <View className="flex-row items-center">
              <Text className="text-white text-sm font-medium">12/10/2025</Text>
              <Spacer />
              <Text className="text-white text-sm font-medium">1 Memory</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default withPageWrapper(Travel);
