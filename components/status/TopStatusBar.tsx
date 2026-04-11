import { equippedItemsAtom } from "@/atoms/bagAtoms";
import {
  topStatusHappinessAtom,
  topStatusSproutsAtom,
} from "@/atoms/homeAtoms";
import { isMailAvailableAtom, isTravelingAtom } from "@/atoms/travelAtoms";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { topStatusBarData } from "@/data/data";
import { MAX_HAPPINESS } from "@/util/constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFocusEffect } from "expo-router";
import { useAtom, useAtomValue } from "jotai";
import { Mail, MapPin } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import uuid from "react-native-uuid";
import Spacer from "../utility/Spacer";
import StartTravelModal from "./StartTravelModal";
import TopStatusBarItem from "./TopStatusBarItem";
import TravelUpdatesModal from "./TravelUpdatesModal";
import TravelPostcardModal from "./TravelPostcardModal";
import UserApi from "@/api/User";
import { EquippedItems } from "@/data/dataInterfaces";
import InventoryApi from "@/api/Inventory";

export default function TopStatusBar() {

  const [currentHappiness, setCurrentHappiness] = useAtom(topStatusHappinessAtom);
  const [currentSprouts, setCurrentSprouts] = useAtom(topStatusSproutsAtom);
  const [equippedItems, setEquippedItems] = useAtom<EquippedItems>(equippedItemsAtom);
  const [isTraveling, setIsTraveling] = useAtom(isTravelingAtom);

  const isMailAvailable = useAtomValue<boolean>(isMailAvailableAtom);

  const [isTravelOpen, setIsTravelOpen] = useState<boolean>(false);
  const [isMailOpen, setIsMailOpen] = useState<boolean>(false);

  const scale = useSharedValue<number>(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useFocusEffect(
    useCallback(() => {
     const fetchEquippedItems = async () => {
      const items = await InventoryApi.getUserEquippedItems();
      if (items) {
        setEquippedItems(items);
      }
     }
     void fetchEquippedItems();
    }, [setEquippedItems])
  );

  
  useFocusEffect(
    useCallback(() => {
      const getUserData = async () => {
        const userData = await UserApi.getUser();
        if (!userData) {
          return;
        }
        setCurrentHappiness(userData.happiness);
        setCurrentSprouts(userData.sprouts);
        setIsTraveling(userData.isTraveling);
      };
      void getUserData();
    }, [setCurrentHappiness, setCurrentSprouts, setIsTraveling])
  );

  function renderHappinessHearts() {
    const greyedOut: number = MAX_HAPPINESS - currentHappiness;
    const heartElements: React.ReactElement[] = [];
    for (let i = 0; i < currentHappiness; i++) {
      heartElements.push(
        <FontAwesome key={uuid.v4()} name="heart" size={25} color="firebrick" />
      );
    }
    for (let i = 0; i < greyedOut; i++) {
      heartElements.push(
        <FontAwesome key={uuid.v4()} name="heart" size={25} color="gray" />
      );
    }
    return heartElements;
  }

  return (
    <View className="bg-teal-500 w-full p-5 rounded-b-lg">
      <View className="flex-row gap-2 mb-4">
        <TopStatusBarItem text={`✨ Day: 0${topStatusBarData.day}`} />
        <TopStatusBarItem text={`☀️ ${topStatusBarData.weather}`} />
        <TopStatusBarItem text={`🌱 Sprouts: ${currentSprouts}`} />
      </View>
      <View className="flex-row gap-1 align-center">
        {renderHappinessHearts()}
        <Spacer />
        <View className="flex-row gap-[0.75rem]">

          {isMailAvailable && (
            <Dialog open={isMailOpen} onOpenChange={setIsMailOpen}>
              <DialogTrigger asChild>
                <Pressable>
                  <Animated.View
                    className="bg-teal-400 p-[0.3rem] rounded-full"
                    style={animatedStyle}
                  >
                    <Mail size={18} color="white" strokeWidth={2} />
                  </Animated.View>
                </Pressable>
              </DialogTrigger>
              <TravelPostcardModal />
            </Dialog>
          )}
          {((Object.keys(equippedItems).length === 4 &&
            currentHappiness === MAX_HAPPINESS) ||
            isTraveling) && (
            <Dialog open={isTravelOpen} onOpenChange={setIsTravelOpen}>
              <DialogTrigger asChild>
                <Pressable>
                  <Animated.View
                    className="bg-teal-400 p-[0.3rem] rounded-full"
                    style={animatedStyle}
                  >
                    <MapPin size={18} color="white" strokeWidth={2} />
                  </Animated.View>
                </Pressable>
              </DialogTrigger>
              {isTraveling ? (
                <TravelUpdatesModal />
              ) : (
                <StartTravelModal setClose={() => setIsTravelOpen(false)} />
              )}
            </Dialog>
          )}
        </View>
      </View>
    </View>
  );
}
