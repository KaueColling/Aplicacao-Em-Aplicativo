// EditListScreen.js
import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";

function EditListScreen({ route, navigation }) {
  const { listId, editedListName, onEditList } = route.params;
  const [newListName, setNewListName] = useState(editedListName);

  const handleSave = () => {
    // Chama a função onEditList para salvar as alterações na lista.
    onEditList(listId, newListName);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Edit List</Text>
      <TextInput
        placeholder="New List Name"
        value={newListName}
        onChangeText={(text) => setNewListName(text)}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

export default EditListScreen;
