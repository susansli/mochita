import { inventoryItemsAtom, isMaxHappinessNotifAtom } from "@/atoms/bagAtoms";
import { topStatusSproutsAtom } from "@/atoms/homeAtoms";
import BagContents from "@/components/bag/BagContents";
import ItemCard from "@/components/bag/ItemCard";
import TravelNotifModal from "@/components/bag/TravelNotifModal";
import PageHeader from "@/components/nav/PageHeader";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Text } from "@/components/ui/text";
import Spacer from "@/components/utility/Spacer";
import { withPageWrapper } from "@/components/wrappers/withPageWrapper";
import { storeItemsList } from "@/data/data";
import { ItemCardData } from "@/data/dataInterfaces";
import { useFocusEffect } from "expo-router";
import { useAtomValue } from "jotai";
import React, { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";

enum ActiveBagPage {
  STORE,
  INVENTORY,
}

function Bag() {
  const inventory = useAtomValue<ItemCardData[]>(inventoryItemsAtom);
  const sprouts = useAtomValue(topStatusSproutsAtom);
  const isMaxHappinessNotif = useAtomValue(isMaxHappinessNotifAtom);

  const [active, setActive] = useState<ActiveBagPage>(ActiveBagPage.STORE);
  const [isTravelNotif, setIsTravelNotif] = useState<boolean>(false);

  useFocusEffect(
      useCallback(() => {
        if (isMaxHappinessNotif) {
          setIsTravelNotif(true);
        }
       
      }, [isMaxHappinessNotif, setIsTravelNotif])
    );

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
    <>
      <Dialog open={isTravelNotif} onOpenChange={setIsTravelNotif}>
        <TravelNotifModal setClose={() => {setIsTravelNotif(false)}} />
      </Dialog>
      <View className="flex-1 bg-stone-200 p-5">
        <PageHeader title="Pack Mochita's Bag" />

        <BagContents />

        <View className="flex-row my-5 gap-2">
          <View className="w-[30%] bg-white p-[0.25rem] rounded-3xl gap-3 items-center justify-center">
            <Text>{`${sprouts} 🌱`}</Text>
          </View>
          <Spacer />
          <Button
            className={`w-[25%] ${active === ActiveBagPage.STORE ? "bg-teal-700" : "bg-stone-300"}`}
            onTouchEnd={() => setActive(ActiveBagPage.STORE)}
          >
            <Text
              className={`text-center ${active === ActiveBagPage.STORE ? "text-white" : "text-gray-400"}`}
            >
              Store
            </Text>
          </Button>
          <Button
            className={`w-[25%] ${active === ActiveBagPage.INVENTORY ? "bg-teal-700" : "bg-stone-300"}`}
            onTouchEnd={() => setActive(ActiveBagPage.INVENTORY)}
          >
            <Text
              className={`text-center ${active === ActiveBagPage.INVENTORY ? "text-white" : "text-gray-400"}`}
            >
              Bag
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
    </>
  );
}

export default withPageWrapper(Bag);
