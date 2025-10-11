import { topStatusHappinessAtom } from "@/atoms/topStatusAtoms";
import { MAX_HAPPINESS } from "@/util/constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAtomValue } from "jotai";
import { View } from "react-native";

export default function TopStatusBar() {

    const currentHappiness = useAtomValue(topStatusHappinessAtom);

    function renderHappinessHearts() {
        const greyedOut: number = MAX_HAPPINESS - currentHappiness;
        const heartElements: React.ReactElement[] = [];
        for (let i = 0; i < currentHappiness; i++) {
            heartElements.push(<FontAwesome name="heart" size={25} color="firebrick" />)
        }
        for (let i = 0; i < greyedOut; i++) {
            heartElements.push(<FontAwesome name="heart" size={25} color="gray" />)
        }
        return heartElements;
    }

    return (
        <View className="bg-teal-500 w-full p-5 rounded-b-lg">
            <View>

            </View>
            <View className="flex-row gap-1">
                {renderHappinessHearts()}
            </View>
        </View>
    );
}