import { mochitaSpeechAtom } from "@/atoms/homeAtoms";
import { isNavbarCollapsedAtom, isNavbarHiddenAtom } from "@/atoms/navAtoms";
import MochitaSpeech from "@/components/home/MochitaSpeech";
import TopStatusBar from "@/components/status/TopStatusBar";
import { useFocusEffect } from "expo-router";
import { useSetAtom } from "jotai";
import { useCallback, useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { withPageWrapper } from "../../components/wrappers/withPageWrapper";
import { SPEECH_TIME } from "@/util/constants";

function Tutorial() {
  const setIsNavbarHidden = useSetAtom(isNavbarHiddenAtom);
  const setIsNavbarCollapsed = useSetAtom(isNavbarCollapsedAtom);
  const setMochitaSpeech = useSetAtom(mochitaSpeechAtom);


  const [isTopStatusHidden, _setIsTopStatusHidden] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => setMochitaSpeech(''), SPEECH_TIME);
      setIsNavbarHidden(false);
      return () => {
        setIsNavbarHidden(true);
        setIsNavbarCollapsed(true);
      };
    }, [setIsNavbarHidden, setIsNavbarCollapsed, setMochitaSpeech])
  );

  return (
    <View className="flex-1 relative">
      <ImageBackground
        source={{ uri: "https://i.imgur.com/WDcPERN.jpeg" }}
        resizeMode="cover"
        style={StyleSheet.absoluteFillObject}
        imageStyle={{}}
      />
      {!isTopStatusHidden && <TopStatusBar />}
      <MochitaSpeech />
      <Image
        source={{ uri: "https://i.imgur.com/n66Cu8e.gif" }}
        className="h-[60%] w-[60%] absolute mt-[85%] ml-[40%]"
        resizeMode="contain"
      />
    </View>
  );
}

export default withPageWrapper(Tutorial);
