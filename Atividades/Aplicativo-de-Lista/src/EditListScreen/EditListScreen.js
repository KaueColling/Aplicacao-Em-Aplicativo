// EditListScreen.js
import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";

function EditList({ route, navigation }) {
  // Desestruturação das propriedades do objeto 'route' e atribuição a variáveis.
  const { listId, editedListName, onEditList } = route.params;

  // Definição de um estado local 'newListName' com valor inicial 'editedListName'.
  const [newListName, setNewListName] = useState(editedListName);

  // Função que lida com o salvamento das alterações na lista.
  const handleSave = () => {
    // Chama a função 'onEditList' passando o 'listId' e o novo nome da lista 'newListName'.
    onEditList(listId, newListName);

    // Navega de volta para a tela anterior.
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Edit List</Text>
      {/* Componente TextInput permite a edição do nome da lista. */}
      <TextInput
        placeholder="New List Name"
        value={newListName}
        onChangeText={(text) => setNewListName(text)} // Atualiza 'newListName' com o texto inserido.
      />

      {/* Botão "Save" para acionar a função 'handleSave' ao ser pressionado. */}
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

export default EditList;
