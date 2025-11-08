import { journalEntriesAtom } from "@/atoms/journalAtoms";
import PageHeader from "@/components/nav/PageHeader";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import Hr from "@/components/utility/Hr";
import Spacer from "@/components/utility/Spacer";
import { withPageWrapper } from "@/components/wrappers/withPageWrapper";
import { JournalEntries, JournalEntryData } from "@/data/dataInterfaces";
import { dateFromMMDDYYYY, sortNumericStringsDescStable } from "@/util/helpers";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import { Calendar, Feather } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface Props {
  entry?: JournalEntryData;
}

function JournalEntry(props: Props) {
  const [date, setDate] = useState<string>(
    props?.entry ? props.entry.date : new Date().toLocaleDateString()
  );
  const [text, setText] = useState<string>(
    props?.entry ? props.entry.text : ""
  );
  const [datePickerVisible, setDatePickerActive] = useState<boolean>(false);
  const [journalEntries, setJournalEntries] =
    useAtom<JournalEntries>(journalEntriesAtom);

  const router = useRouter();

  function saveJournalEntry() {
    // with an actual server & paginated APIs this would be less unwieldy
    const newJournalEntries = { ...journalEntries };
    const entryIndex = dateFromMMDDYYYY(date).getTime();

    if (props?.entry && date !== props.entry.date) {
      const oldEntryIndex = new Date(props.entry.date)
        .getTime()
        .toString();

      delete newJournalEntries[oldEntryIndex];
    }

    newJournalEntries[entryIndex] = {
      date: date,
      text: text,
    };

    // "sort" by creating new object, will handle through direct API call to refresh atom later
    const newDateKeys = sortNumericStringsDescStable(
      Object.keys(newJournalEntries)
    );

    const sortedJournalEntries: JournalEntries = {};

    newDateKeys.forEach((key) => {
      sortedJournalEntries[key] = {...newJournalEntries[key]};
    });

    setJournalEntries(sortedJournalEntries);
    
    router.back();
  }

  return (
    <>
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={(date) => {
          setDate(date.toLocaleDateString());
          setDatePickerActive(false);
        }}
        onCancel={() => setDatePickerActive(false)}
      />
      <View className="flex-1 bg-teal-100 p-5">
        <PageHeader
          title="Dear Diary..."
          arrowBg="bg-teal-500"
          arrowColor="white"
        />
        <View className="mb-[0.5rem]" />
        <Hr color="border-teal-600" />
        <View className="flex-row mt-[0.5rem] items-center">
          <Text className="font-medium text-lg py-2 px-5 bg-white rounded-full">{`☀️ ${date}`}</Text>
          <Spacer />
          <Button
            onTouchEnd={() => setDatePickerActive(true)}
            className="bg-teal-600 flex-row items-center gap-2 px-3 py-2"
          >
            <Calendar size={18} color="#fff" strokeWidth={2} />
            <Text className="text-white">Edit Date</Text>
          </Button>
        </View>
        <Textarea
          placeholder="Prompt idea: the first thing you noticed when you looked outside today?"
          style={{ backgroundColor: "white", borderColor: "transparent" }}
          className="mt-[1.5rem] rounded-3xl p-[1rem] h-[60vh]"
          value={text}
          onChangeText={setText}
        />

        <Button
          className="bg-teal-600 flex-row items-center gap-2 px-3 py-2 mt-8"
          onTouchEnd={saveJournalEntry}
        >
          <Feather size={18} color="#fff" strokeWidth={2} />
          <Text className="text-white">Save Journal Entry</Text>
        </Button>
      </View>
    </>
  );
}

export default withPageWrapper(JournalEntry);
