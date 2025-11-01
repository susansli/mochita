import PageHeader from "@/components/nav/PageHeader";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import Hr from "@/components/utility/Hr";
import Spacer from "@/components/utility/Spacer";
import { withPageWrapper } from "@/components/wrappers/withPageWrapper";
import { Calendar, Feather } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

function JournalEntry() {
  const [date, setDate] = useState<string>(new Date().toLocaleDateString());
  const [text, setText] = useState<string>("");

  return (
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
        <Button className="bg-teal-600 flex-row items-center gap-2 px-3 py-2">
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

      <Button className="bg-teal-600 flex-row items-center gap-2 px-3 py-2 mt-8">
        <Feather size={18} color="#fff" strokeWidth={2} />
        <Text className="text-white">Save Journal Entry</Text>
      </Button>
    </View>
  );
}

export default withPageWrapper(JournalEntry);
