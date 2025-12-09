import PageHeader from "@/components/nav/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import Spacer from "@/components/utility/Spacer";
import { withPageWrapper } from "@/components/wrappers/withPageWrapper";
import { View } from "react-native";

function Travel() {
  return (
    <View className="flex-1 bg-teal-100 p-5">
      <PageHeader
        title="Travel Stories"
        arrowBg="bg-teal-500"
        arrowColor="white"
      />
      <View className="flex-row items-center w-100% mt-[1.5rem] mb-[1rem]">
        <Input
          className="!bg-white border-teal-500 !w-[75%]"
          keyboardType="default"
          placeholder="Trip title..."
        />
        <Spacer />
        <Button className="bg-teal-500">
          <Text>Search</Text>
        </Button>
      </View>
    </View>
  );
}

export default withPageWrapper(Travel);
