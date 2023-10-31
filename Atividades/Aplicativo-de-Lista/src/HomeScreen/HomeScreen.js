import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen({ navigation }) {
  // Definindo estados com hooks do React.
  const [lists, setLists] = useState([]); // Armazena a lista de objetos de lista.
  const [listToEdit, setListToEdit] = useState(null); // Rastreia a lista que está sendo editada.
  const [editedListName, setEditedListName] = useState(""); // Rastreia o nome editado da lista.

  // UseEffect é utilizado para carregar as listas salvas no AsyncStorage ao iniciar a tela.
  useEffect(() => {
    async function loadLists() {
      try {
        const savedLists = await AsyncStorage.getItem("lists"); // Lê as listas salvas no AsyncStorage.
        if (savedLists) {
          const parsedLists = JSON.parse(savedLists); // Analisa as listas em formato JSON.
          setLists(parsedLists); // Atualiza o estado com as listas recuperadas.
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
      const newList = { id: Date.now(), name: newListName }; // Cria um objeto de lista com um ID único.
      const updatedLists = [...lists, newList]; // Adiciona a nova lista à lista existente.
      setLists(updatedLists); // Atualiza o estado com a nova lista.
      saveListsToStorage(updatedLists); // Salva as listas atualizadas no AsyncStorage.
    }
  };

  // Função para editar uma lista.
  const editList = (id) => {
    setListToEdit(id); // Define a lista que está sendo editada.
    const listToEdit = lists.find((list) => list.id === id); // Encontra a lista pelo ID.
    if (listToEdit) {
      setEditedListName(listToEdit.name); // Define o nome da lista a ser editada.
    }
  };

  // Função para salvar as alterações feitas na lista editada.
  const saveEditedList = () => {
    if (listToEdit !== null && editedListName.trim() !== "") {
      const updatedLists = lists.map((list) =>
        list.id === listToEdit ? { ...list, name: editedListName } : list
      ); // Mapeia as listas e atualiza a lista editada.
      setLists(updatedLists); // Atualiza o estado com as listas editadas.
      saveListsToStorage(updatedLists); // Salva as listas atualizadas no AsyncStorage.
      setListToEdit(null); // Limpa a lista sendo editada.
      setEditedListName(""); // Limpa o nome editado da lista.
    }
  };

  // Função para excluir uma lista.
  const deleteList = (id) => {
    const updatedLists = lists.filter((list) => list.id !== id); // Filtra a lista a ser excluída.
    setLists(updatedLists); // Atualiza o estado com a lista excluída.
    saveListsToStorage(updatedLists); // Salva as listas atualizadas no AsyncStorage.
  };

  // Função para salvar as listas no AsyncStorage.
  const saveListsToStorage = async (listsToSave) => {
    try {
      await AsyncStorage.setItem("lists", JSON.stringify(listsToSave)); // Converte e salva as listas em formato JSON.
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
              <Button title="Save" onPress={saveEditedList} />
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

export default HomeScreen;
