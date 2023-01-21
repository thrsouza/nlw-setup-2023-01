import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

import { Home } from "../screens/Home";
import { NewHabit } from "../screens/NewHabit";
import { DayHabits } from "../screens/DayHabits";

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="newHabit" component={NewHabit} />
      <Screen name="dayHabits" component={DayHabits} />
    </Navigator>
  );
}
