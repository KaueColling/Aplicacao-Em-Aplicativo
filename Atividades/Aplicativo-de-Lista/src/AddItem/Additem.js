import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";

function AddItem({ route, navigation }) {
  const [newItemName, setNewItemName] = useState("");

  const { onAddItem } = route.params;

  const addItem = () => {
    if (newItemName) {
      onAddItem(newItemName);
      setNewItemName("");  // Limpe o campo de entrada após adicionar o item
      navigation.goBack();
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Item Screen</Text>
      <TextInput
        placeholder="Nome do Item"
        value={newItemName}
        onChangeText={(text) => setNewItemName(text)}
      />
      <Button title="Adicionar Item" onPress={addItem} />
    </View>
  );
}

export default AddItem;
