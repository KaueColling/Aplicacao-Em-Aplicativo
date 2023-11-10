// EditListScreen.js
import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from "react-native";

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
      <Text style={styles.texto}>Edit List</Text>

      {/* Componente TextInput permite a edição do nome da lista. */}
      <TextInput
        style={styles.texto}
        placeholder="New List Name"
        value={newListName}
        onChangeText={(text) => setNewListName(text)} // Atualiza 'newListName' com o texto inserido.
      />

      {/* Botão "Save" para acionar a função 'handleSave' ao ser pressionado. */}
      <TouchableOpacity style={styles.AddItem} onPress={handleSave}>
        <Text style={styles.textoBotao}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  texto: {
    fontSize: 25,
    margin: 5,
  },

  AddItem: {
    marginLeft: 16,
    marginTop: 20,
    marginRight: 16,
    backgroundColor: "#225A76",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
  },

  textoBotao: {
    fontSize: 25,
    color: "#fffafa",
  },
});

export default EditList;
