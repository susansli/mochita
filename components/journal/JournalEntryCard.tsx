import { activeJournalEntryAtom } from "@/atoms/journalAtoms";
import { JournalEntryData } from "@/data/dataInterfaces";
import { truncateText } from "@/util/helpers";
import { useRouter } from "expo-router";
import { useSetAtom } from "jotai";
import { ChevronRight } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { Text } from "../ui/text";
import Spacer from "../utility/Spacer";

interface Props {
  entry: JournalEntryData;
}

export default function JournalEntryCard(props: Props) {
  const router = useRouter();

  const setActiveJournalEntry = useSetAtom(activeJournalEntryAtom);

  function renderTagCircles() {
    if (props.entry?.tags) {
      return props.entry.tags.map((tag, i) => {
        return (
          <View
            key={i}
            className={`p-[0.5rem] rounded-full`}
            style={{ backgroundColor: tag.color }}
          />
        );
      });
    }
  }

  return (
    <Pressable
      className="p-[1rem] bg-teal-500 w-full mb-[1rem] rounded-lg"
      onTouchEnd={() => {
        setActiveJournalEntry(props.entry);
        router.push("/pages/journal-entry");
      }}
    >
      <View className="flex-row">
        <Text className="text-lg font-semibold text-white items-center">
          {props.entry.date}
        </Text>
        <Spacer />
        <ChevronRight size={24} color="#fff" strokeWidth={2} />
      </View>
      <View className="p-[0.5rem] bg-white mt-2 rounded-lg">
        <Text className="color-gray-500">
          {truncateText(props.entry.text, 105, true)}
        </Text>
      </View>

      <>
        {props.entry?.tags && props.entry.tags.length && (
          <View className="flex-row">
            <Spacer />
            <View className="flex-row p-[0.5rem] rounded-3xl bg-white mt-[1rem] gap-[0.5rem]">
              {renderTagCircles()}
            </View>
          </View>
        )}
      </>
    </Pressable>
  );
}
