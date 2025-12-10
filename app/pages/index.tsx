import { isNavbarHiddenAtom } from "@/atoms/navAtoms";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useFocusEffect, useRouter } from "expo-router";
import { useSetAtom } from "jotai";
import { useCallback } from "react";
import { ImageBackground, View } from "react-native";
import { withPageWrapper } from "../../components/wrappers/withPageWrapper";
import "../../global.css";

function Index() {
  const setIsNavbarHidden = useSetAtom(isNavbarHiddenAtom);

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      setIsNavbarHidden(true);
    }, [setIsNavbarHidden])
  );

  return (
    <ImageBackground
      source={{ uri: "https://i.imgur.com/KPhy3Xn.jpeg" }}
      resizeMode="cover"
      className="justify-center items-center flex-1"
    >
      <View className="mt-[80%] items-center">
        <Text className="text-2xl font-bold mb-10 text-white">
          mochita: a self-care game
        </Text>

        <Button disabled className="w-60 h-12 mb-3 bg-white">
          <Text className="text-gray-500">Continue</Text>
        </Button>
        <Button
          className="w-60 h-12 bg-teal-800"
          onTouchEnd={() => router.push("/pages/tutorial")}
        >
          <Text>New Game</Text>
        </Button>
      </View>
    </ImageBackground>
  );
}

export default withPageWrapper(Index);
