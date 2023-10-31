// ListaScreen.js
import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";

function ListaScreen({ route, navigation }) {
  const [newListName, setNewListName] = useState("");

  const { onAddList } = route.params;

  const addList = () => {
    if (newListName) {
      onAddList(newListName);
      navigation.goBack();
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Lista Screen</Text>
      <TextInput
        placeholder="Nome da Lista"
        value={newListName}
        onChangeText={(text) => setNewListName(text)}
      />
      <Button title="Adicionar Lista" onPress={addList} />
    </View>
  );
}

export default ListaScreen;
