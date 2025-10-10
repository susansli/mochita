import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children?: React.ReactNode;
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default function PageWrapper(props: Props) {
    return (
        <GestureHandlerRootView style={styles.body}>
            <SafeAreaView>
                {props?.children}
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}