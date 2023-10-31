import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";



function HomeScreen({ route, navigation }) {
  // Receba as listas como parâmetros da rota
  const { lists } = route.params || { lists: [] };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Add List"
        onPress={() => { navigation.navigate("ListaScreen") }}
      />

      {/* Exibir as listas */}
      {lists.map((list, index) => (
        <Text key={index}>{list}</Text>
      ))}
    </View>
  );
}

export default HomeScreen;