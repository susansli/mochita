import React from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { EdgeInsets, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import BottomNav from "../nav/BottomNav";

interface Props {
  children?: React.ReactNode;
}

export default function PageWrapper(props: Props) {
  
  const insets: EdgeInsets = useSafeAreaInsets();

  function renderBottomNav(): React.ReactNode {
    return (
      <View
        pointerEvents="box-none"
        className="absolute left-0 right-0 bottom-0 z-50"
      >
        <View
          style={{ paddingBottom: Math.max(insets.bottom, 8) }}
          className="px-5"
        >
          <BottomNav />
        </View>
      </View>
    );
  }

  return (
    <GestureHandlerRootView className="w-full h-full">
      <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
        {props?.children}
        {renderBottomNav()}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
