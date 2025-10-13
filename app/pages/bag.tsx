import BagContents from "@/components/bag/BagContents";
import PageHeader from "@/components/nav/PageHeader";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { withPageWrapper } from "@/components/wrappers/withPageWrapper";
import { View } from "react-native";

function Bag() {
  return (
    <View className="flex-1 bg-stone-200 p-5">
      <PageHeader title="Bag + Goodies Shop" />
      <BagContents />
      <View className="flex-row mt-5 gap-3">
        <Button className="bg-teal-700 w-[48%]">
            <Text className="text-white text-center">Inventory</Text>
        </Button>

        <Button className="bg-stone-300 w-[48%]">
            <Text className="text-gray-400 text-center">Store</Text>
        </Button>

      </View>
    </View>
  );
}

export default withPageWrapper(Bag);
