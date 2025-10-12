import { goalsListAtom } from "@/atoms/goalsAtoms";
import CreateGoals from "@/components/goals/CreateGoals";
import GoalsCard from "@/components/goals/GoalsCard";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Hr from "@/components/utility/Hr";
import Spacer from "@/components/utility/Spacer";
import { withPageWrapper } from "@/components/wrappers/withPageWrapper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { useAtomValue } from "jotai";
import { View } from "react-native";

function Goals() {
  const router = useRouter();
  const goalsList = useAtomValue(goalsListAtom);

  function renderGoalsList() {
    return goalsList.map((goal, i) => {
      return <GoalsCard key={i} data={goal} />;
    });
  }

  return (
    <View className="flex-1 bg-stone-200 p-5">
      <View className="flex-row justify-center items-center">
        <View
          className="px-3 py-2 rounded-full bg-stone-300 justify-center items-center"
          onTouchEnd={() => router.back()}
        >
          <FontAwesome name={"chevron-left"} size={20} color="teal" />
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

      <CreateGoals />

      <View className="gap-3">
        {goalsList.length ? (
          renderGoalsList()
        ) : (
          <Text className="p-5 rounded-xl bg-stone-300 text-stone-500 text-center">✨ No goals... yet ✨</Text>
        )}
      </View>
    </View>
  );
}

export default withPageWrapper(Goals);
