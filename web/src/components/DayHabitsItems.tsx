import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Habit {
  possibleHabits: {
    id: string;
    title: string;
    created_at: string;
  }[];
  completedHabits: string[];
}

interface DayHabitsItemsProps {
  date: Date;
  onCompletedChanged: (completed: number) => void;
}

export function DayHabitsItems({
  date,
  onCompletedChanged,
}: DayHabitsItemsProps) {
  const [habits, setHabits] = useState<Habit>();

  useEffect(() => {
    api
      .get("/day", { params: { date: date.toISOString() } })
      .then((response) => {
        setHabits(response.data as Habit);
      });
  }, []);

  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habits?.possibleHabits.map((habit) => (
        <Checkbox.Root
          key={habit.id}
          className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
          checked={habits.completedHabits.includes(habit.id)}
          disabled={isDateInPast}
          onCheckedChange={() => {
            api.patch(`/habits/${habit.id}/toggle`).then(() => {
              let completedHabits: string[] = [];

              if (habits.completedHabits.includes(habit.id)) {
                completedHabits = [
                  ...habits.completedHabits.filter((id) => id !== habit.id),
                ];
              } else {
                completedHabits = [...habits.completedHabits, habit.id];
              }

              setHabits({ ...habits, completedHabits });

              onCompletedChanged(completedHabits.length);
            });
          }}
        >
          <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-500  group-focus:ring-offset-2 group-focus:ring-offset-woodsmoke-900">
            <Checkbox.Indicator>
              <Check size={20} className="text-white" />
            </Checkbox.Indicator>
          </div>
          <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
            {habit.title}
          </span>
        </Checkbox.Root>
      ))}
    </div>
  );
}
