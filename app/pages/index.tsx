import { Link } from "expo-router";
import { Text, View } from "react-native";
import { withPageWrapper } from "../../components/wrappers/withPageWrapper";
import "../../styles/global.css";

function Index() {
  return (
    <View className="items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">This is Mochita!</Text>
      <Link className="text-red-500" href={"/pages/tutorial"}>
        Link to the tutorial
      </Link>
    </View>
  );
}

export default withPageWrapper(Index);
