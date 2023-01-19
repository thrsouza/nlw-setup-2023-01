import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";

export function Routes() {
  return (
    <View className="flex-1 bg-woodsmoke-900">
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  );
}
