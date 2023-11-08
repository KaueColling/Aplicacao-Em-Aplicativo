// Importa as bibliotecas necessárias do React e React Native.
import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";

/**
 * Componente "AddItem" utilizado para adicionar um novo item a uma lista.
 *
 * @param {object} route - Propriedades de rota passadas à tela.
 * @param {object} navigation - Navegação entre telas.
 */
function AddItem({ route, navigation }) {
  // Define o estado local para armazenar o nome do novo item.
  const [newItemName, setNewItemName] = useState("");

  // Extrai a função "onAddItem" das propriedades de rota.
  const { onAddItem } = route.params;

  /**
   * Função para adicionar um novo item.
   */
  const addItem = () => {
    // Verifica se o nome do novo item não está vazio.
    if (newItemName) {
      // Chama a função "onAddItem" passando o nome do novo item como argumento.
      onAddItem(newItemName);

      // Limpa o campo de entrada após adicionar o item.
      setNewItemName("");

      // Navega de volta para a tela anterior.
      navigation.goBack();
    }
  };

  // Renderiza a interface da tela.
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Item Screen</Text>
      
      {/* Campo de entrada para o nome do novo item */}
      <TextInput
        placeholder="Nome do Item"
        value={newItemName}
        onChangeText={(text) => setNewItemName(text)}
      />

      {/* Botão para adicionar o item */}
      <Button title="Adicionar Item" onPress={addItem} />
    </View>
  );
}

// Exporta o componente "AddItem" para uso em outras partes da aplicação.
export default AddItem;
