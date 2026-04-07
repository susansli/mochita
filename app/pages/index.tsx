import { isNavbarHiddenAtom } from "@/atoms/navAtoms";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useFocusEffect, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useSetAtom } from "jotai";
import { useCallback, useState } from "react";
import { ImageBackground, View } from "react-native";
import { withPageWrapper } from "../../components/wrappers/withPageWrapper";
import "../../global.css";
import { getUserId } from "@/util/helpers";
import UserApi from "@/api/User";

function Index() {
  const router = useRouter();

  const setIsNavbarHidden = useSetAtom(isNavbarHiddenAtom);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isContinueDisabled, setIsContinueDisabled] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      setIsNavbarHidden(true);
      void checkExistingUser();
    }, [setIsNavbarHidden]),
  );

  async function checkExistingUser() {
    const user = await getUserId();
    if (user) {
      setIsContinueDisabled(false);
    }
  }

  async function newGame() {
    try {
      setIsLoading(true);
      // call API

      const response = await UserApi.createNewUser();

      if (!response) {
        console.error("Failed to create new user");
        return;
      }

      const userId = response.id;

      // store user id in secure storage
      await SecureStore.setItemAsync("userId", userId);

      // retrieve user id from secure storage to confirm it was stored correctly
      const storeResponse = await SecureStore.getItemAsync("userId");

      if (!storeResponse) {
        console.error("Failed to store user id");
        return;
      }

      router.push("/pages/tutorial");
    } catch (e) {
      console.error("Error creating new user:", e);
    } finally {
      setIsLoading(false);
    }
  }

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

        <Button
          disabled={isContinueDisabled}
          className="w-60 h-12 mb-3 bg-white"
          onTouchEnd={() => router.push("/pages/tutorial")}
        >
          <Text className="text-gray-500">Continue</Text>
        </Button>
        <Button
          className="w-60 h-12 bg-teal-800"
          disabled={isLoading}
          onTouchEnd={async () => await newGame()}
        >
          <Text>New Game</Text>
        </Button>
      </View>
    </ImageBackground>
  );
}

export default withPageWrapper(Index);
