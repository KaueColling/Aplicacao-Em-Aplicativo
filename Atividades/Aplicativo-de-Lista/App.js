
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/HomeScreen";
import EditListScreen from "./src/EditListScreen";
import ListaScreen from "./src/ListaScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ListaScreen" component={ListaScreen} />
        <Stack.Screen name="EditListScreen" component={EditListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;