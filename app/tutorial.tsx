import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default function NotFound() {
  return (
    <View style={styles.body}>
      <Text>{`404. You're not supposed to be here...`}</Text>
      <Link style={styles.button} href={"/"}>
        Link to the tutorial
      </Link>
    </View>
  );
}
