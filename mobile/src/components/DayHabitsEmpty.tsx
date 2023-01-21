import { Text } from "react-native";

export function DayHabitsEmpty() {
  return (
    <Text className="text-zinc-400 text-base">
      Não há hábitos disponíveis para a data selecionada.
    </Text>
  );
}
