import { isNavbarHiddenAtom } from "@/atoms/navAtoms";
import TopStatusBar from "@/components/status/TopStatusBar";
import { useFocusEffect } from "expo-router";
import { useSetAtom } from "jotai";
import { useCallback, useState } from "react";
import { View, ImageBackground, StyleSheet, Image } from "react-native";
import { withPageWrapper } from "../../components/wrappers/withPageWrapper";

function Tutorial() {
  const setIsNavbarHidden = useSetAtom(isNavbarHiddenAtom);
  const [isTopStatusHidden, setIsTopStatusHidden] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      setIsNavbarHidden(false);
      setIsTopStatusHidden(false);
    }, [setIsNavbarHidden, setIsTopStatusHidden])
  );

  return (
    <View className="flex-1">
      <ImageBackground
        source={{ uri: "https://i.imgur.com/WDcPERN.jpeg" }}
        resizeMode="cover"
        style={StyleSheet.absoluteFillObject}
        imageStyle={{}}
      />
      {!isTopStatusHidden && <TopStatusBar />}
      <Image
        source={{ uri: "https://i.imgur.com/n66Cu8e.gif" }}
        className="h-[60%] w-[60%] absolute mt-[85%] ml-[40%]"
        resizeMode="contain"
      />
    </View>
  );
}

export default withPageWrapper(Tutorial);
