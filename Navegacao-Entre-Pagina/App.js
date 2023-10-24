import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useMemo } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Pagina1 from './src/Pagina1';
import Pagina2 from './src/Pagina2';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={({ navigation }) =>
          <View>
            <Text>Home</Text>
            <Button title='1' onPress={() => navigation.navigate("Pagina1")}></Button>
            <Button title='2' onPress={() => navigation.navigate("Pagina2")}></Button>
          </View>} />
        <Stack.Screen name="Pagina1" component={Pagina1} />
        <Stack.Screen name="Pagina2" component={Pagina2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});