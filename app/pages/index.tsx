import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { withPageWrapper } from "../util/withPageWrapper";

const styles = StyleSheet.create({
  button: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is Mochita!</Text>
      <Link style={styles.button} href={"/pages/tutorial"}>
        Link to the tutorial
      </Link>
    </View>
  );
}

export default withPageWrapper(Index);
