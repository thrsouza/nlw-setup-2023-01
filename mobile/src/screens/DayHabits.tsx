import { useEffect, useState } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import { BackButton } from "../components/BackButton";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import clsx from "clsx";

import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { DayHabitsEmpty } from "../components/DayHabitsEmpty";
import { Loading } from "../components/Loading";

import { api } from "../lib/axios";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";

interface DayHabits {
  possibleHabits: {
    id: string;
    title: string;
    created_at: string;
  }[];
  completedHabits: string[];
}

interface DayHabitsRouteParams {
  date: string;
}

export function DayHabits() {
  const [loading, setLoading] = useState(true);
  const [dayHabits, setDayHabits] = useState<DayHabits>();
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  const route = useRoute();
  const { date } = route.params as DayHabitsRouteParams;

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");
  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

  const habitsProgress = dayHabits?.possibleHabits.length
    ? generateProgressPercentage(
        dayHabits?.possibleHabits.length,
        completedHabits.length
      )
    : 0;

  async function fetchHabits() {
    try {
      setLoading(true);

      const response = await api.get("/day", { params: { date } });
      const habits = response.data as DayHabits;

      setDayHabits(habits);
      setCompletedHabits(habits.completedHabits);
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não foi possívelcarregar as informações de hábitos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) {
    return <Loading />;
  }

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

        <ProgressBar progress={habitsProgress} />

        <View
          className={clsx("mt-6", {
            "opacity-50": isDateInPast,
          })}
        >
          {dayHabits && dayHabits.possibleHabits.length > 0 ? (
            dayHabits?.possibleHabits.map((dayHabit) => (
              <Checkbox
                key={dayHabit.id}
                title={dayHabit.title}
                disabled={isDateInPast}
                checked={completedHabits.includes(dayHabit.id)}
                onPress={() => {
                  api.patch(`/habits/${dayHabit.id}/toggle`).then(() => {
                    if (completedHabits.includes(dayHabit.id)) {
                      setCompletedHabits(
                        completedHabits.filter((id) => id !== dayHabit.id)
                      );
                    } else {
                      setCompletedHabits([...completedHabits, dayHabit.id]);
                    }

                    // onCompletedChanged(completedHabits.length);
                  });
                }}
              />
            ))
          ) : (
            <DayHabitsEmpty />
          )}
        </View>

        {isDateInPast && (
          <Text className="text-white mt-10 text-base text-center">
            Você não pode editar itens de datas passadas.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
