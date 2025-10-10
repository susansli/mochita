import { Text, View } from "react-native";
import { withPageWrapper } from "../../components/wrappers/withPageWrapper";
import { isNavbarHiddenAtom } from "@/atoms/navAtoms";
import { useSetAtom } from "jotai";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";

function Tutorial() {
  const setIsNavbarHidden = useSetAtom(isNavbarHiddenAtom);

  useFocusEffect(
    useCallback(() => {
      setIsNavbarHidden(false);
    }, [setIsNavbarHidden])
  );

  return (
    <View>
      <Text>Tutorial Page</Text>
    </View>
  );
}

export default withPageWrapper(Tutorial);
