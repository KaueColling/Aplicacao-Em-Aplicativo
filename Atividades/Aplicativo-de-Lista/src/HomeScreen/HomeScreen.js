// HomeScreen.js

// Importações necessárias do React e componentes do React Native.
import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Componente funcional "HomeScreen" que representa a tela principal da aplicação.
function HomeScreen({ navigation }) {
  // Estado para armazenar a lista de listas, lista atualmente em edição e nome editado.
  const [lists, setLists] = useState([]);
  const [listToEdit, setListToEdit] = useState(null);
  const [editedListName, setEditedListName] = useState("");

  // Efeito que carrega as listas salvas no AsyncStorage ao iniciar a tela.
  useEffect(() => {
    // Função assíncrona para carregar as listas.
    async function loadLists() {
      try {
        // Tenta obter as listas salvas no AsyncStorage.
        const savedLists = await AsyncStorage.getItem("lists");
        if (savedLists) {
          // Se listas foram encontradas, as analisa em formato JSON e atualiza o estado.
          const parsedLists = JSON.parse(savedLists);
          setLists(parsedLists);
        }
      } catch (error) {
        console.error("Error loading lists: ", error);
      }
    }

    loadLists(); // Chama a função para carregar as listas ao montar a tela.
  }, []);

  // Função para adicionar uma nova lista à tela HomeScreen.
  const addList = (newListName) => {
    if (newListName) {
      // Cria um objeto de lista com um ID único baseado no horário atual.
      const newList = { id: Date.now(), name: newListName };
      const updatedLists = [...lists, newList]; // Adiciona a nova lista à lista existente.
      setLists(updatedLists); // Atualiza o estado com a nova lista.
      saveListsToStorage(updatedLists); // Salva as listas atualizadas no AsyncStorage.
    }
  };

  // Função para editar uma lista.
  const editList = (id) => {
    // Navega para a tela "EditListScreen" passando informações relevantes.
    navigation.navigate("EditListScreen", {
      listId: id,
      editedListName: editedListName,
      onEditList: saveEditedList, // Passa a função para salvar a lista editada.
    });
  };

  // Função para salvar as alterações feitas na lista editada.
  const saveEditedList = (listId, newName) => {
    if (listId !== null && newName.trim() !== "") {
      // Mapeia as listas e atualiza a lista editada.
      const updatedLists = lists.map((list) =>
        list.id === listId ? { ...list, name: newName } : list
      );
      setLists(updatedLists); // Atualiza o estado com as listas editadas.
      saveListsToStorage(updatedLists); // Salva as listas atualizadas no AsyncStorage.
      setListToEdit(null); // Limpa a lista sendo editada.
      setEditedListName(""); // Limpa o nome editado da lista.
    }
  };

  // Função para excluir uma lista.
  const deleteList = (id) => {
    // Filtra a lista a ser excluída da lista de listas.
    const updatedLists = lists.filter((list) => list.id !== id);
    setLists(updatedLists); // Atualiza o estado com a lista excluída.
    saveListsToStorage(updatedLists); // Salva as listas atualizadas no AsyncStorage.
  };

  // Função para salvar as listas no AsyncStorage.
  const saveListsToStorage = async (listsToSave) => {
    try {
      // Converte e salva as listas em formato JSON no AsyncStorage.
      await AsyncStorage.setItem("lists", JSON.stringify(listsToSave));
    } catch (error) {
      console.error("Error saving lists: ", error);
    }
  };

  // Renderiza a interface da tela HomeScreen.
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Add List"
        onPress={() => {
          navigation.navigate("ListaScreen", {
            onAddList: addList, // Passa a função para adicionar lista à tela de adição de lista.
          });
        }}
      />
      {lists.map((list) => (
        <View key={list.id} style={{ flexDirection: "row", alignItems: "center" }}>
          {listToEdit === list.id ? (
            <View>
              <TextInput
                value={editedListName}
                onChangeText={(text) => setEditedListName(text)}
              />
              <Button title="Save" onPress={() => saveEditedList(list.id, editedListName)} />
            </View>
          ) : (
            <Text>{list.name}</Text>
          )}
          <TouchableOpacity onPress={() => editList(list.id)}>
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteList(list.id)}>
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

export default HomeScreen; // Exporta o componente HomeScreen para uso em outras partes da aplicação.
