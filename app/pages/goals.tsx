import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Hr from "@/components/utility/Hr";
import Spacer from "@/components/utility/Spacer";
import { withPageWrapper } from "@/components/wrappers/withPageWrapper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { View } from "react-native";

function Goals() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-stone-200 p-5">

      <View className="flex-row justify-center items-center">
        <View 
          className="px-3 py-2 rounded-full bg-stone-300 justify-center items-center"
          onTouchEnd={() => router.back()}
        >
          <FontAwesome name={"chevron-left"} size={20} color="teal" onTouchEnd={() => router.back()} />
        </View>
        <Spacer />
        <Text className="text-2xl text-teal-700 font-medium">Goal Setting</Text>
      </View>

      <Hr />

      <View className="flex-row gap-2">
        <Button className="bg-stone-300">
          <Text className="text-black w-20 text-center">Today</Text>
        </Button>
        <Button disabled={true} className="bg-stone-300">
          <Text className="text-stone-500 w-20 text-center">Past Goals</Text>
        </Button>
      </View>

      <Hr color="border-gray-400" />


    </View>
  );
}

export default withPageWrapper(Goals);
