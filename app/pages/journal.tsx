import PageHeader from "@/components/nav/PageHeader";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Spacer from "@/components/utility/Spacer";
import { Calendar, Pen } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { withPageWrapper } from "../../components/wrappers/withPageWrapper";
import Hr from "@/components/utility/Hr";

function Journal() {
  const [startDate, setStartDate] = useState<string>(
    new Date().toLocaleDateString()
  );
  const [endDate, setEndDate] = useState<string>("");

  function renderDateTitle() {
    if (startDate.length && endDate.length) {
      return `☀️ From ${startDate} to ${endDate}`;
    }
    return `☀️ ${startDate}`;
  }

  return (
    <View className="flex-1 bg-stone-200 p-5">
      <PageHeader title="Journal with Mochita" />
      <View className="flex-row mt-[2rem] items-center">
        <Text className="font-medium text-xl">{renderDateTitle()}</Text>
      </View>
      <Hr />
      <View className="flex-row gap-2">
        <Spacer />
        <Button className="bg-teal-600 flex-row items-center gap-2 px-3 py-2">
          <Calendar size={18} color="#fff" strokeWidth={2} />
          <Text className="text-white">Filter Dates</Text>
        </Button>

        <Button
          variant="outline"
          className="border"
          style={{ borderColor: "#0d9488" }}
        >
          <Pen size={18} color="#0d9488" strokeWidth={2} />
          <Text className="text-teal-600">Create Entry</Text>
        </Button>
      </View>
    </View>
  );
}

export default withPageWrapper(Journal);
