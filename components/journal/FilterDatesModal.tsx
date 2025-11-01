import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

interface Props {
  setClose: () => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
}

enum DateActive {
  NONE,
  START_DATE,
  END_DATE,
}

export default function FilterDatesModal(props: Props) {
  const [activeSetting, setActiveSetting] = useState<DateActive>(
    DateActive.NONE
  );
  const [datePickerVisible, setDatePickerActive] = useState<boolean>(false);
  const [localStartDate, setLocalStartDate] = useState<string>(props.startDate);
  const [localEndDate, setLocalEndDate] = useState<string>(props.endDate);

  function handleConfirm(date: string) {
    if (activeSetting === DateActive.START_DATE) {
      setLocalStartDate(date);
    } else if (activeSetting === DateActive.END_DATE) {
      setLocalEndDate(date);
    }
    setDatePickerActive(false);
    setActiveSetting(DateActive.NONE);
  }

  function handleSave() {
    props.setClose();
    props.setEndDate(localEndDate);
    props.setStartDate(localStartDate);
  }

  return (
    <>
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={(date) => handleConfirm(date.toLocaleDateString())}
        onCancel={() => setDatePickerActive(false)}
      />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Entry Dates</DialogTitle>
          <DialogDescription>
            Change the dates here to filter your journal entries. Set start and
            end dates as equal to get entries for the same day!
          </DialogDescription>
        </DialogHeader>
        <View className="gap-2">
          <View className="flex-row gap-2 items-center">
            <Button
              className="bg-teal-600 w-[7rem]"
              onTouchEnd={() => {
                setActiveSetting(DateActive.START_DATE);
                setDatePickerActive(true);
              }}
            >
              <Text>Start Date: </Text>
            </Button>
            <Text>{localStartDate}</Text>
          </View>

          <View className="flex-row gap-2 items-center">
            <Button
              className="bg-teal-600 w-[7rem]"
              onTouchEnd={() => {
                setActiveSetting(DateActive.END_DATE);
                setDatePickerActive(true);
              }}
            >
              <Text>End Date: </Text>
            </Button>
            <Text>{localEndDate}</Text>
          </View>
        </View>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onTouchEnd={props.setClose}>
              <Text>Cancel</Text>
            </Button>
          </DialogClose>
          <Button onTouchEnd={handleSave}>
            <Text>Save Changes</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
}
