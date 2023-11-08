import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";

// Componente ListaScreen
function AddList({ route, navigation }) {
  // Estado local para rastrear o nome da nova lista
  const [newListName, setNewListName] = useState("");

  // Extrair a função onAddList dos parâmetros da rota
  const { onAddList } = route.params;

  // Função chamada ao adicionar uma nova lista
  const addList = () => {
    // Verifica se o nome da nova lista não está vazio
    if (newListName) {
      // Chama a função onAddList passando o nome da nova lista
      onAddList(newListName);

      // Navega de volta para a tela anterior (HomeScreen)
      navigation.goBack();
    }
  };

  // Renderização da tela
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Lista Screen</Text>

      {/* Input de texto para inserir o nome da nova lista */}
      <TextInput
        placeholder="Nome da Lista"
        value={newListName}
        onChangeText={(text) => setNewListName(text)}
      />

      {/* Botão para adicionar a nova lista */}
      <Button title="Adicionar Lista" onPress={addList} />
    </View>
  );
}

// Exporta o componente ListaScreen para ser usado em outras partes do aplicativo
export default AddList;
