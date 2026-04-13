import { ActivityIndicator, Image, View } from "react-native";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Text } from "../ui/text";
import {
  isTravelingAtom,
  postcardDataAtom,
  tripDataAtom,
} from "@/atoms/travelAtoms";
import { useAtom, useAtomValue } from "jotai";
import { PostcardData, TripData } from "@/data/dataInterfaces";
import TravelApi from "@/api/Travel";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Easing, Notifier } from "react-native-notifier";

export default function TravelUpdatesModal() {
  const [postcardData, setPostcardData] = useAtom<PostcardData | null>(
    postcardDataAtom,
  );
  const [tripData, setTripData] = useAtom<TripData | null>(tripDataAtom);
  const isTraveling = useAtomValue<boolean>(isTravelingAtom);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      const getActiveTripData = async () => {
        if (isTraveling && !tripData) {
          const tripData = await TravelApi.getActiveTripData();
          if (tripData) {
            setTripData(tripData);
          }
        }
      };
      void getActiveTripData();
    }, [isTraveling, setTripData, tripData]),
  );

  async function getTravelUpdates() {
    setIsLoading(true);
    const tripUpdate = await TravelApi.updateTrip();
    const postcardData = await TravelApi.getPostcardData(tripData?.id || "");
    if (postcardData) {
      setPostcardData(postcardData);
    }
    if (tripUpdate) {
      setTripData(tripUpdate);
    }
    Notifier.showNotification({
      title: `📫 You have mail!`,
      description: `Mochita has a new postcard update from her travels! She can't wait for you to read it.`,
      showAnimationDuration: 800,
      showEasing: Easing.bounce,
    });
    setIsLoading(false);
  }

  return (
    <DialogContent className="sm">
      {tripData && (
        <>
          <DialogHeader>
            <DialogTitle>{`${tripData.locationName}: Day ${tripData.daysElapsed + 1}`}</DialogTitle>
          </DialogHeader>
          <View className="grid gap-4 mt-[1rem]">
            <View className="items-center">
              {isLoading ? (
                <>
                  <ActivityIndicator
                    size="large"
                    color="teal"
                    className="w-20 h-20 my-[1rem]"
                    style={{ transform: [{ scale: 3 }] }}
                  />
                  <Text className="text-center font-semibold mt-[1rem]">
                    Wait while we check in on Mochita. Do not close this modal!
                  </Text>
                </>
              ) : (
                <>
                  <Image
                    source={{ uri: tripData.locationImgUrl }}
                    className="h-[12rem] w-full mb-[1rem]"
                    resizeMode="contain"
                  />
                  <Text className="text-center text-sm mb-[1rem] italic">
                    {tripData.locationFlavorText}
                  </Text>
                  <Text className="text-center text-sm mb-[1rem]">
                    {`Mochita: ${tripData.currentTravelStageText}`}
                  </Text>
                </>
              )}
            </View>
          </View>
        </>
      )}
      <DialogFooter className="flex-row gap-[6%]">
        {!isLoading && (
          <>
            <Button
              variant="outline"
              className="w-[47%]}"
              onTouchEnd={async () => await getTravelUpdates()}
              disabled={postcardData !== null}
            >
              <Text>Check Updates</Text>
            </Button>
            <DialogClose asChild>
              <Button className="w-[47%]">
                <Text>Close</Text>
              </Button>
            </DialogClose>
          </>
        )}
      </DialogFooter>
    </DialogContent>
  );
}
