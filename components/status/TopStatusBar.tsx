import { equippedItemsAtom } from "@/atoms/bagAtoms";
import {
    topStatusHappinessAtom,
    topStatusSproutsAtom,
} from "@/atoms/homeAtoms";
import { topStatusBarData } from "@/data/data";
import { MAX_HAPPINESS } from "@/util/constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAtomValue } from "jotai";
import { MapPin } from "lucide-react-native";
import { useEffect } from "react";
import { Pressable, View } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";
import uuid from "react-native-uuid";
import Spacer from "../utility/Spacer";
import TopStatusBarItem from "./TopStatusBarItem";

export default function TopStatusBar() {
  const currentHappiness = useAtomValue(topStatusHappinessAtom);
  const currentSprouts = useAtomValue(topStatusSproutsAtom);
  const equippedItems = useAtomValue(equippedItemsAtom);

  const scale = useSharedValue<number>(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.1, { duration: 500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [scale]);

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
        {Object.keys(equippedItems).length === 4 &&
          currentHappiness === MAX_HAPPINESS && (
            <Pressable>
                <Animated.View
                className="bg-teal-400 p-[0.3rem] rounded-full"
                style={animatedStyle}
                >
                <MapPin size={18} color="white" strokeWidth={2} />
                </Animated.View>
            </Pressable>
          )}
      </View>
    </View>
  );
}
