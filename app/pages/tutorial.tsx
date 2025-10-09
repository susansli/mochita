import { StyleSheet, Text, View } from "react-native";
import { withPageWrapper } from "../util/withPageWrapper";

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

function Tutorial() {
  return (
    <View style={styles.body}>
      <Text>Tutorial Page</Text>
    </View>
  );
}

export default withPageWrapper(Tutorial);
