import { equippedItemsAtom } from "@/atoms/bagAtoms";
import { topStatusHappinessAtom } from "@/atoms/homeAtoms";
import {
  isMailAvailableAtom,
  isTravelingAtom,
  tripDataAtom,
} from "@/atoms/travelAtoms";
import { useAtom, useSetAtom } from "jotai";
import { Image, View, ActivityIndicator } from "react-native";
import { Easing, Notifier } from "react-native-notifier";
import { Button } from "../ui/button";
import { DialogClose, DialogContent, DialogFooter } from "../ui/dialog";
import { Text } from "../ui/text";
import { aggregateEvents } from "@/util/helpers";
import { EquippedItems } from "@/data/dataInterfaces";
import { useState } from "react";
import TravelApi from "@/api/Travel";

interface Props {
  setClose: () => void;
}

enum TravelStates {
  NOT_TRAVELING,
  TRAVEL_LOADING,
  TRAVEL_LOADED,
}

export default function StartTravelModal(props: Props) {
  const [travelState, setTravelState] = useState<TravelStates>(
    TravelStates.NOT_TRAVELING,
  );
  const [tripData, setTripData] = useAtom(tripDataAtom);

  const [equippedItems, setEquippedItems] =
    useAtom<EquippedItems>(equippedItemsAtom);
  const setIsTraveling = useSetAtom(isTravelingAtom);
  const setHappiness = useSetAtom(topStatusHappinessAtom);
  const setIsMailAvailable = useSetAtom(isMailAvailableAtom); // placeholder

  function renderItemDescriptions() {
    const effectTextArray = Object.keys(equippedItems).map(
      (key) => equippedItems[key].effectText,
    );
    const transformedArray = aggregateEvents(effectTextArray);
    return transformedArray.map((text, i) => {
      return (
        <Text key={i} className="italic text-sm">
          {text}
        </Text>
      );
    });
  }

  async function startTravel() {
    try {
      setTravelState(TravelStates.TRAVEL_LOADING);
      const response = await TravelApi.beginTrip();
      if (response) {
        setTripData(response);
        setTravelState(TravelStates.TRAVEL_LOADED);
      }
    } catch {
      Notifier.showNotification({
        title: "Error starting travel",
        description: "Please try again later.",
      });
      setTravelState(TravelStates.NOT_TRAVELING);
    } finally {
    }
  }

  function confirmTravel() {
    setIsTraveling(true);
    setEquippedItems({});
    setHappiness(0);
    setIsMailAvailable(true);

    props.setClose();
    Notifier.showNotification({
      title: `Mochita has left on a trip!`,
      description: `She will be back in 3 days. Remember to stay up to date with her adventures ❤️`,
      showAnimationDuration: 800,
      showEasing: Easing.bounce,
    });
  }

  function renderModalContent() {
    if (travelState === TravelStates.NOT_TRAVELING) {
      return renderTravelConfirmation();
    } else if (travelState === TravelStates.TRAVEL_LOADING) {
      return renderTravelLoading();
    } else if (travelState === TravelStates.TRAVEL_LOADED) {
      return renderTravelLoaded();
    }
    return <></>; // should never happen
  }

  function renderTravelConfirmation() {
    return (
      <>
        <Image
          source={{
            uri: "https://res.cloudinary.com/drt4r7tyw/image/upload/v1776028901/mochi-travel_nf3ex4.png",
          }}
          className="h-[15rem] w-[15rem]"
          resizeMode="contain"
        />
        <View className="my-[1rem] p-[1rem] bg-teal-200 rounded-lg w-full items-center">
          <Text className="font-semibold">Your current build:</Text>
          {renderItemDescriptions()}
        </View>
        <Text className="text-center mb-[1rem]">
          Send Mochita away on a trip?
        </Text>
        <Text className="text-center mb-[1rem]">
          Mochita will be away for 3 days and all equipped items will be used
          up. Double check to make sure everything is set!
        </Text>
      </>
    );
  }

  function renderTravelLoading() {
    return (
      <>
        <Image
          source={{
            uri: "https://res.cloudinary.com/drt4r7tyw/image/upload/v1776028901/mochi-travel_nf3ex4.png",
          }}
          className="h-[15rem] w-[15rem] mb-[1rem]"
          resizeMode="contain"
        />
        <ActivityIndicator
          size="large"
          color="teal"
          className="w-20 h-20"
          style={{ transform: [{ scale: 2.2 }] }}
        />
        <Text className="text-center font-semibold mt-[1rem]">
          Wait while Mochita is packing. Do not close this modal!
        </Text>
      </>
    );
  }

  function renderTravelLoaded() {
    if (!tripData) {
      return (
        <Text className="text-center">
          {" "}
          Oh no! There was an error with your trip. Please try again later.
        </Text>
      );
    }
    return (
      <>
        <Image
          source={{ uri: tripData.locationImgUrl }}
          className="h-[12rem] w-full mb-[1rem]"
          resizeMode="contain"
        />
        <Text className="text-center mb-[1rem] font-semibold">
          {`Mochita is on her way to ${tripData.locationName}!`}
        </Text>
        <Text className="text-center italic mb-[1rem]">{`${tripData.locationFlavorText}`}</Text>
      </>
    );
  }

  function renderTravelConfirmationFooter() {
    return (
      <>
        <DialogClose asChild>
          <Button variant="outline" className="w-[47%]">
            <Text>Cancel</Text>
          </Button>
        </DialogClose>
        <Button
          className="w-[47%]"
          onTouchEnd={async () => {
            await startTravel();
          }}
          disabled={travelState === TravelStates.TRAVEL_LOADING}
        >
          <Text>Yes!</Text>
        </Button>
      </>
    );
  }

  function renderTravelLoadedFooter() {
    return (
      <Button className="w-[100%]" onTouchEnd={confirmTravel}>
        <Text>Got it!</Text>
      </Button>
    );
  }

  function renderFooter() {
    if (travelState === TravelStates.NOT_TRAVELING) {
      return renderTravelConfirmationFooter();
    }
    if (travelState === TravelStates.TRAVEL_LOADED) {
      return renderTravelLoadedFooter();
    }
    return <></>;
  }

  return (
    <DialogContent className="sm">
      <View className="grid gap-4 mt-[1rem]">
        <View className="items-center">{renderModalContent()}</View>
      </View>
      <DialogFooter className="flex-row gap-[6%]">
        {renderFooter()}
      </DialogFooter>
    </DialogContent>
  );
}
