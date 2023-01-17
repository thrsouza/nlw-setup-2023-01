type HabitProps = {
  completed: number;
};

export function Habit({ completed }: HabitProps) {
  return (
    <div
      className="
        bg-zinc-900 text-white 
        w-10 h-10 rounded m-2
        flex items-center justify-center
      "
    >
      {completed}
    </div>
  );
}
