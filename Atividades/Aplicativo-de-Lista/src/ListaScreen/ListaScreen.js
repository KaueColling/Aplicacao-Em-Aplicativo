import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ListaScreen({ navigation }) {
  const [newListName, setNewListName] = useState("");
  const [lists, setLists] = useState([]);

  const addList = async () => {
    if (newListName) {
      // Salvar a nova lista no AsyncStorage
      const updatedLists = [...lists, newListName];
      await AsyncStorage.setItem("lists", JSON.stringify(updatedLists));

      // Atualizar o estado com a nova lista
      setLists(updatedLists);

      // Limpar o campo de entrada
      setNewListName("");

      // Passar as listas atualizadas como parâmetro ao navegar de volta
      navigation.navigate("HomeScreen", { lists: updatedLists });
    }
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Lista Screen</Text>
      <TextInput
        placeholder="Nome da Lista"
        value={newListName}
        onChangeText={(text) => setNewListName(text)}
      />
      <Button title="Adicionar Lista" onPress={addList} />
      {lists.map((list, index) => (
        <Text key={index}>{list}</Text>
      ))}
    </View>
  );
}

export default ListaScreen;
