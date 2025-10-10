import { isNavbarHiddenAtom } from "@/atoms/navAtoms";
import { Text } from "@/components/ui/text";
import { Link, useFocusEffect } from "expo-router";
import { useSetAtom } from "jotai";
import { useCallback} from "react";
import { View } from "react-native";
import { withPageWrapper } from "../../components/wrappers/withPageWrapper";
import "../../global.css";

function Index() {
  const setIsNavbarHidden = useSetAtom(isNavbarHiddenAtom);

  useFocusEffect(
    useCallback(() => {
      setIsNavbarHidden(true);
    }, [setIsNavbarHidden])
  );

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
