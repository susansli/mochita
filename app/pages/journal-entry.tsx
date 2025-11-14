import { mochitaSpeechAtom, topStatusSproutsAtom } from "@/atoms/homeAtoms";
import {
  activeJournalEntryAtom,
  journalEntriesAtom,
} from "@/atoms/journalAtoms";
import PageHeader from "@/components/nav/PageHeader";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import Hr from "@/components/utility/Hr";
import Spacer from "@/components/utility/Spacer";
import { withPageWrapper } from "@/components/wrappers/withPageWrapper";
import { tagData } from "@/data/data";
import {
  JournalEntries,
  JournalEntryData,
  TagData,
} from "@/data/dataInterfaces";
import { JOURNAL_SPROUTS } from "@/util/constants";
import { dateFromMMDDYYYY, sortNumericStringsDescStable } from "@/util/helpers";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { useAtom, useSetAtom } from "jotai";
import { Calendar, Feather } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Easing, Notifier } from "react-native-notifier";

const styles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    height: 50,
    backgroundColor: "transparent",
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
    color: "black",
  },
});

function JournalEntry() {
  const [entry, setEntry] = useAtom<JournalEntryData | undefined>(
    activeJournalEntryAtom
  );
  const [sprouts, setSprouts] = useAtom<number>(topStatusSproutsAtom);
  const setMochitaSpeech = useSetAtom(mochitaSpeechAtom);
  const [journalEntries, setJournalEntries] =
    useAtom<JournalEntries>(journalEntriesAtom);

  const [date, setDate] = useState<string>(
    entry ? entry.date : new Date().toLocaleDateString()
  );
  const [text, setText] = useState<string>(entry ? entry.text : "");
  const [datePickerVisible, setDatePickerActive] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);

  const router = useRouter();

  function saveJournalEntry() {
    // with an actual server & paginated APIs this would be less unwieldy
    const newJournalEntries = { ...journalEntries };
    const entryIndex = dateFromMMDDYYYY(date).getTime();

    if (entry && date !== entry.date) {
      // issue with overwriting prev entry, need to change indexing structure
      const oldEntryIndex = dateFromMMDDYYYY(entry.date).getTime().toString();
      delete newJournalEntries[oldEntryIndex];
      setMochitaSpeech(
        "Love it when you journal, even if it's on a different day!"
      );
    } else {
      if (!(entryIndex in newJournalEntries)) {
        // new entry so add sprouts
        setSprouts(sprouts + JOURNAL_SPROUTS);
        Notifier.showNotification({
          title: `Daily Journaling Complete!`,
          description: `You've earned ${JOURNAL_SPROUTS} 🌱 - Mochita is proud of you!`,
          showAnimationDuration: 800,
          showEasing: Easing.bounce,
        });
        setMochitaSpeech("Ooo, thanks for sharing that with me! 💖");
      } else {
        setMochitaSpeech("You had more thoughts to add, huh?");
      }
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
      sortedJournalEntries[key] = { ...newJournalEntries[key] };
    });

    setJournalEntries(sortedJournalEntries);

    setEntry(undefined);
    router.back();
  }

  function renderTagItem(item: TagData) {
    return (
      <View className="flex-row p-[1rem]">
        <Text className="font-semibold">{item.label}</Text>
        <Spacer />
        <AntDesign
          style={styles.icon}
          name="check-circle"
          color={item.color}
          size={20}
        />
      </View>
    );
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

        <View className="mt-[1rem] p-[1rem] bg-white rounded-3xl">
          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={tagData}
            labelField="label"
            valueField="value"
            placeholder="Select Tags"
            searchPlaceholder="Search..."
            value={selected}
            onChange={(item) => {
              setSelected(item);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color="teal"
                name="tags"
                size={20}
              />
            )}
            renderItem={renderTagItem}
            renderSelectedItem={(item, unSelect) => {
              return (
                <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                  <View className="flex-row gap-[0.5rem] p-[0.5rem] items-center rounded-full bg-gray-100 mt-[0.5rem] mr-[0.5rem]">
                    <View
                      className={`p-[0.5rem] rounded-full`}
                      style={{ backgroundColor: item.color }}
                    />
                    <Text>{item.label}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <Textarea
          placeholder="Prompt idea: the first thing you noticed when you looked outside today?"
          style={{ backgroundColor: "white", borderColor: "transparent" }}
          className="mt-[1rem] rounded-3xl p-[1rem] h-[45vh]"
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
