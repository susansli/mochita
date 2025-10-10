import { Link } from "expo-router";
import { View } from "react-native";
import { withPageWrapper } from "../../components/wrappers/withPageWrapper";
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import "../../global.css";

function Index() {
  return (
    <View className="items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">This is Mochita!</Text>
      <Link className="text-red-500" href={"/pages/tutorial"}>
        Link to the tutorial
      </Link>
      <Button variant="destructive">
      <Text>Button Test</Text>
    </Button>
    </View>
  );
}

export default withPageWrapper(Index);
