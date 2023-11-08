
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/HomeScreen";
import EditListScreen from "./src/EditListScreen";
import ListaScreen from "./src/ListaScreen";
import ItemScreenList from "./src/ItemScreenList";
import AddItemList from "./src/AddItem";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddList" component={ListaScreen} />
        <Stack.Screen name="EditList" component={EditListScreen} />
        <Stack.Screen name="ItemList" component={ItemScreenList} />
        <Stack.Screen name="AddItem" component={AddItemList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;