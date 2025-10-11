import GoalsCard from "@/components/goals/GoalsCard";
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
          <FontAwesome
            name={"chevron-left"}
            size={20}
            color="teal"
          />
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

      <View className="flex-row mb-5">
        <Spacer />
        <Button className="bg-teal-600">
          <Text className="w-20 text-center">+ Create</Text>
        </Button>
      </View>

      <View>
        <GoalsCard goal="Drink 7 glasses of water today! Drink 7 glasses of water today!" isComplete={true} />
      </View>

    </View>
  );
}

export default withPageWrapper(Goals);
