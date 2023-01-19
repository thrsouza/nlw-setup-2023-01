import { ScrollView, View, Text } from "react-native";
import { BackButton } from "../components/BackButton";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";

interface HabitRouteParams {
  date: string;
}

export function Habit() {
  const route = useRoute();

  const { date } = route.params as HabitRouteParams;

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  return (
    <View className="flex-1 bg-woodsmoke-900 px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={80} />

        <View className="mt-6">
          <Checkbox title="Beber 2L de água" checked />
          <Checkbox title="Me exercitar" checked />
        </View>
      </ScrollView>
    </View>
  );
}
