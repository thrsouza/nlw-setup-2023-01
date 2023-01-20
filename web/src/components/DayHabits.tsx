import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";
import dayjs from "dayjs";
import clsx from "clsx";

import { generateProgressPercentage } from "../utils/generate-progress-percentage";

import { DayHabitsItems } from "./DayHabitsItems";
import { ProgressBar } from "./ProgressBar";

interface DayHabitsProps {
  date: Date;
  defaultCompleted: number;
  amount: number;
}

export function DayHabits({ date, amount, defaultCompleted }: DayHabitsProps) {
  const [completed, setCompleted] = useState(defaultCompleted);

  const completedPercentage = generateProgressPercentage(amount, completed);

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  function handleAmountCompletedChanged(newCompleted: number) {
    setCompleted(newCompleted);
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          "w-10 h-10  rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-woodsmoke-900",
          {
            "bg-zinc-900 border-2 border-zinc-800": completedPercentage === 0,

            "bg-violet-900 border-violet-700":
              completedPercentage > 0 && completedPercentage < 20,

            "bg-violet-800 border-violet-600":
              completedPercentage >= 20 && completedPercentage < 40,

            "bg-violet-700 border-violet-500":
              completedPercentage >= 40 && completedPercentage < 60,

            "bg-violet-600 border-violet-500":
              completedPercentage >= 60 && completedPercentage < 80,

            "bg-violet-500 border-violet-400": completedPercentage >= 80,
          }
        )}
      />

      <Popover.Portal>
        <Popover.Content
          side="top"
          className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col focus:outline-none"
        >
          <span className="font-semibold text-zinc-400">
            {dayOfWeek.toLocaleLowerCase()}
          </span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>
          <ProgressBar progress={completedPercentage} />

          <DayHabitsItems
            date={date}
            onCompletedChanged={handleAmountCompletedChanged}
          />

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
