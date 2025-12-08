import { equippedItemsAtom, isMaxHappinessNotifAtom } from "@/atoms/bagAtoms";
import { mochitaSpeechAtom, topStatusHappinessAtom } from "@/atoms/homeAtoms";
import { isNavbarCollapsedAtom, isNavbarHiddenAtom } from "@/atoms/navAtoms";
import MochitaSpeech from "@/components/home/MochitaSpeech";
import TopStatusBar from "@/components/status/TopStatusBar";
import { SPEECH_TIME } from "@/util/constants";
import { useFocusEffect } from "expo-router";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { withPageWrapper } from "../../components/wrappers/withPageWrapper";

function Tutorial() {
  const setIsNavbarHidden = useSetAtom(isNavbarHiddenAtom);
  const setIsNavbarCollapsed = useSetAtom(isNavbarCollapsedAtom);
  const [mochitaSpeech, setMochitaSpeech] = useAtom(mochitaSpeechAtom);
  const [isMaxHappinessNotif, setIsMaxHappinessMotif] = useAtom(isMaxHappinessNotifAtom);
  const equippedItems = useAtomValue(equippedItemsAtom);
  const [happiness, setHappiness] = useAtom(topStatusHappinessAtom);

  const [isTopStatusHidden, _setIsTopStatusHidden] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      if (isMaxHappinessNotif) {
        if (Object.keys(equippedItems).length === 4) {
          setMochitaSpeech("Nya~ all ready to go traveling!");
        } else {
          setMochitaSpeech("I feel ready to travel, but I still need gear!");
        }
        setIsMaxHappinessMotif(false);
      }
      setTimeout(() => setMochitaSpeech(''), SPEECH_TIME);
      setIsNavbarHidden(false);
      return () => {
        setIsNavbarHidden(true);
        setIsNavbarCollapsed(true);
      };
    }, [setIsNavbarHidden, setIsNavbarCollapsed, setMochitaSpeech, mochitaSpeech, isMaxHappinessNotif, setIsMaxHappinessMotif])
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
