import { topStatusHappinessAtom, topStatusSproutsAtom } from "@/atoms/homeAtoms";
import { topStatusBarData } from "@/data/data";
import { MAX_HAPPINESS } from "@/util/constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAtomValue } from "jotai";
import { View } from "react-native";
import uuid from 'react-native-uuid';
import TopStatusBarItem from "./TopStatusBarItem";

export default function TopStatusBar() {

    const currentHappiness = useAtomValue(topStatusHappinessAtom);
    const currentSprouts = useAtomValue(topStatusSproutsAtom);

    function renderHappinessHearts() {
        const greyedOut: number = MAX_HAPPINESS - currentHappiness;
        const heartElements: React.ReactElement[] = [];
        for (let i = 0; i < currentHappiness; i++) {
            heartElements.push(<FontAwesome key={uuid.v4()} name="heart" size={25} color="firebrick" />)
        }
        for (let i = 0; i < greyedOut; i++) {
            heartElements.push(<FontAwesome key={uuid.v4()} name="heart" size={25} color="gray" />)
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
            <View className="flex-row gap-1">
                {renderHappinessHearts()}
            </View>
        </View>
    );
}