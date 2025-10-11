import { isNavbarHiddenAtom } from "@/atoms/navAtoms";
import TopStatusBar from "@/components/status/TopStatusBar";
import { useFocusEffect } from "expo-router";
import { useSetAtom } from "jotai";
import { useCallback, useState } from "react";
import { View } from "react-native";
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
      {!isTopStatusHidden && <TopStatusBar />}
    </View>
  );
}

export default withPageWrapper(Tutorial);
