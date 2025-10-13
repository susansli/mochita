import BagContents from "@/components/bag/BagContents";
import ItemCard from "@/components/bag/ItemCard";
import PageHeader from "@/components/nav/PageHeader";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { withPageWrapper } from "@/components/wrappers/withPageWrapper";
import { storeItemsList } from "@/data/data";
import React from "react";
import { ScrollView, View } from "react-native";

function Bag() {
  return (
    <View className="flex-1 bg-stone-200 p-5">
      <PageHeader title="Pack Mochita's Bag" />

      <BagContents />

      <View className="flex-row my-5 gap-3">
        <Button className="bg-teal-700 w-[48%]">
          <Text className="text-white text-center">Store</Text>
        </Button>
        <Button className="bg-stone-300 w-[48%]">
          <Text className="text-gray-400 text-center">Inventory</Text>
        </Button>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-stone-400 rounded-lg"
        contentContainerStyle={{
          padding: 16,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {storeItemsList.map((item, i) => (
          <View key={i} className="w-1/2 p-2">
            <ItemCard item={item} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default withPageWrapper(Bag);
