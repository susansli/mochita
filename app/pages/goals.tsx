import { goalsListAtom } from "@/atoms/goalsAtoms";
import CreateGoals from "@/components/goals/CreateGoals";
import GoalsCard from "@/components/goals/GoalsCard";
import PageHeader from "@/components/nav/PageHeader";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Hr from "@/components/utility/Hr";
import { withPageWrapper } from "@/components/wrappers/withPageWrapper";
import { useAtomValue } from "jotai";
import { View } from "react-native";

function Goals() {
  const goalsList = useAtomValue(goalsListAtom);

  function renderGoalsList() {
    return goalsList.map((goal, i) => {
      return <GoalsCard key={i} data={goal} />;
    });
  }

  return (
    <View className="flex-1 bg-stone-200 p-5">
      
      <PageHeader title="Goal Setting" />

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
          <Text className="p-5 rounded-xl bg-stone-300 text-stone-500 text-center">
            ✨ No goals... yet ✨
          </Text>
        )}
      </View>
    </View>
  );
}

export default withPageWrapper(Goals);
