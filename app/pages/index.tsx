import { isNavbarHiddenAtom } from "@/atoms/navAtoms";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useFocusEffect, useRouter } from "expo-router";
import { useSetAtom } from "jotai";
import { useCallback } from "react";
import { Image, View } from "react-native";
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
    <View className="flex-col justify-center items-center w-screen h-screen">
      <Image
        source={{ uri: "https://i.imgur.com/mx0wroQ.png" }}
        className="h-60 w-full mb-10"
        resizeMode="contain"
      />
      <Text className="text-xl font-bold mb-10">mochita: a self-care game</Text>

      <Button variant="outline" disabled className="w-60 h-12 mb-3">
        <Text>Continue</Text>
      </Button>
      <Button
        className="w-60 h-12"
        onTouchEnd={() => router.push("/pages/tutorial")}
      >
        <Text>New Game</Text>
      </Button>
    </View>
  );
}

export default withPageWrapper(Index);
