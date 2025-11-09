import {
  activeJournalEntryAtom,
  journalEntriesAtom,
} from "@/atoms/journalAtoms";
import FilterDatesModal from "@/components/journal/FilterDatesModal";
import JournalEntryCard from "@/components/journal/JournalEntryCard";
import PageHeader from "@/components/nav/PageHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Text } from "@/components/ui/text";
import Hr from "@/components/utility/Hr";
import Spacer from "@/components/utility/Spacer";
import { JournalEntries } from "@/data/dataInterfaces";
import { useFocusEffect, useRouter } from "expo-router";
import { useAtomValue, useSetAtom } from "jotai";
import { Calendar, Pen } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { withPageWrapper } from "../../components/wrappers/withPageWrapper";

function Journal() {
  const [startDate, setStartDate] = useState<string>(
    new Date().toLocaleDateString()
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toLocaleDateString()
  );
  const [open, setOpen] = useState<boolean>(false);

  const journalEntries = useAtomValue<JournalEntries>(journalEntriesAtom);

  const setActiveJournalEntry = useSetAtom(activeJournalEntryAtom);

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
       setActiveJournalEntry(undefined);
    }, [setActiveJournalEntry])
  );

  useEffect(() => {

    // TODO after server implementation

  }, [startDate, endDate]);

  function renderDateTitle() {
    if (startDate !== endDate) {
      return `☀️ From ${startDate} to ${endDate}`;
    }
    return `☀️ ${startDate}`;
  }

  function renderJournalEntryCards() {
    if (!Object.keys(journalEntries).length) {
      return (
        <View className="w-full">
          <Text className="p-5 rounded-xl bg-stone-300 text-stone-500 text-center">
            ✨ No entries... yet ✨
          </Text>
        </View>
      );
    }
    return Object.keys(journalEntries).map((entry, i) => {
      return <JournalEntryCard entry={journalEntries[entry]} key={i} />;
    });
  }

  return (
    <View className="flex-1 bg-stone-200 p-5">
      <PageHeader title="Journal with Mochita" />
      <View className="flex-row mt-[2rem] items-center">
        <Text className="font-medium text-lg">{renderDateTitle()}</Text>
      </View>
      <Hr />
      <View className="flex-row gap-2 mt-2">
        <Spacer />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 flex-row items-center gap-2 px-3 py-2">
              <Calendar size={18} color="#fff" strokeWidth={2} />
              <Text className="text-white">Filter Dates</Text>
            </Button>
          </DialogTrigger>
          <FilterDatesModal
            startDate={startDate}
            endDate={endDate}
            setStartDate={(date) => setStartDate(date)}
            setEndDate={(date) => setEndDate(date)}
            setClose={() => setOpen(false)}
          />
        </Dialog>

        <Button
          variant="outline"
          className="border"
          style={{ borderColor: "#0d9488" }}
          onTouchEnd={() => router.push("/pages/journal-entry")}
        >
          <Pen size={18} color="#0d9488" strokeWidth={2} />
          <Text className="text-teal-600">Create Entry</Text>
        </Button>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="mt-6">
        {renderJournalEntryCards()}
      </ScrollView>
    </View>
  );
}

export default withPageWrapper(Journal);
