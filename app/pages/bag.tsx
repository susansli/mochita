import { inventoryItemsAtom } from "@/atoms/bagAtoms";
import BagContents from "@/components/bag/BagContents";
import ItemCard from "@/components/bag/ItemCard";
import PageHeader from "@/components/nav/PageHeader";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { withPageWrapper } from "@/components/wrappers/withPageWrapper";
import { storeItemsList } from "@/data/data";
import { ItemCardData } from "@/data/dataInterfaces";
import { useAtomValue } from "jotai";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";

function Bag() {
  enum ActiveBagPage {
    STORE,
    INVENTORY,
  }

  const inventory = useAtomValue<ItemCardData[]>(inventoryItemsAtom);
  const [active, setActive] = useState<ActiveBagPage>(ActiveBagPage.STORE);

  function renderItemCards() {
    if (active === ActiveBagPage.STORE) {
      return storeItemsList.map((item, i) => (
        <View key={i} className="w-1/2 p-2">
          <ItemCard item={item} />
        </View>
      ));
    } else {
      return inventory.map((item, i) => (
        <View key={i} className="w-1/2 p-2">
          <ItemCard item={item} />
        </View>
      ));
    }
  }

  return (
    <View className="flex-1 bg-stone-200 p-5">
      <PageHeader title="Pack Mochita's Bag" />

      <BagContents />

      <View className="flex-row my-5 gap-3">
        <Button
          className={`w-[48%] ${active === ActiveBagPage.STORE ? "bg-teal-700" : "bg-stone-300"}`}
          onTouchEnd={() => setActive(ActiveBagPage.STORE)}
        >
          <Text
            className={`text-center ${active === ActiveBagPage.STORE ? "text-white" : "text-gray-400"}`}
          >
            Store
          </Text>
        </Button>
        <Button
          className={`w-[48%] ${active === ActiveBagPage.INVENTORY ? "bg-teal-700" : "bg-stone-300"}`}
          onTouchEnd={() => setActive(ActiveBagPage.INVENTORY)}
        >
          <Text
             className={`text-center ${active === ActiveBagPage.INVENTORY ? "text-white" : "text-gray-400"}`}
          >
            Inventory
          </Text>
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
        {renderItemCards()}
      </ScrollView>
    </View>
  );
}

export default withPageWrapper(Bag);
