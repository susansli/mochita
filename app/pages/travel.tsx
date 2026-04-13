import TravelApi from "@/api/Travel";
import { postcardDataAtom, tripDataAtom } from "@/atoms/travelAtoms";
import PageHeader from "@/components/nav/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import Spacer from "@/components/utility/Spacer";
import { withPageWrapper } from "@/components/wrappers/withPageWrapper";
import { PostcardData, TripData } from "@/data/dataInterfaces";
import { useFocusEffect, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { useCallback } from "react";
import { View, Image, Pressable } from "react-native";

function Travel() {
  const router = useRouter();

  const [tripData, setTripData] = useAtom<TripData | null>(tripDataAtom);
  const [postcardData, setPostcardData] = useAtom<PostcardData | null>(
    postcardDataAtom,
  );

  useFocusEffect(
    useCallback(() => {
      const fetchTravelData = async () => {
        if (!tripData) {
          const tripResponse = await TravelApi.getActiveTripData();
          if (tripResponse) {
            setTripData(tripResponse);
          }
        } else {
          if (!postcardData) {
            const postcardResponse = await TravelApi.getPostcardData(
              tripData.id,
            );
            if (postcardResponse) {
              setPostcardData(postcardResponse);
            }
          }
        }
      };

      void fetchTravelData();
    }, [postcardData, setPostcardData, setTripData, tripData]),
  );

  return (
    <View className="flex-1 bg-teal-100 p-5">
      <PageHeader
        title="Travel Stories"
        arrowBg="bg-teal-500"
        arrowColor="white"
      />

      <View className="flex-row items-center w-100% my-[1.5rem]">
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

      <View>
        {tripData && postcardData && (
          <View className="bg-teal-500 p-[1rem] w-full rounded-lg flex-row gap-[1rem] items-center">
            <Image
              source={{ uri: tripData.locationImgUrl }}
              className="h-[4rem] w-[4rem] rounded-full"
              resizeMode="cover"
            />

            <Pressable
              className="flex-1"
              onTouchEnd={() => router.push("/pages/travel-details")}
            >
              <Text className="text-white text-lg font-bold mb-[1rem]">
                {tripData.locationName}
              </Text>
              <View className="flex-row items-center">
                <Text className="text-white text-sm font-medium">
                  {tripData.startDateString}
                </Text>
                <Spacer />
                <Text className="text-white text-sm font-medium">1 Memory</Text>
              </View>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

export default withPageWrapper(Travel);
