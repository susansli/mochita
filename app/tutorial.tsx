import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default function Tutorial() {
  return (
    <View style={styles.body}>
      <Text>Tutorial Page</Text>
    </View>
  );
}
