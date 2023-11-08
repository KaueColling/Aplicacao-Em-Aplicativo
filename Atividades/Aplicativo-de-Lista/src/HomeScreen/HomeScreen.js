import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Home({ navigation }) {
  const [list, setList] = useState([]);
  const [lists, setLists] = useState([]);
  const [listToEdit, setListToEdit] = useState(null);
  const [editedListName, setEditedListName] = useState("");

  useEffect(() => {
    async function loadLists() {
      try {
        const savedLists = await AsyncStorage.getItem("lists");
        if (savedLists) {
          const parsedLists = JSON.parse(savedLists);
          setLists(parsedLists);
        }
      } catch (error) {
        console.error("Error loading lists: ", error);
      }
    }

    loadLists();
  }, []);

  const addList = (newListName) => {
    if (newListName) {
      const newList = { id: Date.now(), name: newListName };
      const updatedLists = [...lists, newList];
      setLists(updatedLists);
      saveListsToStorage(updatedLists);
    }
  }

  // Função para editar uma lista.
  const editList = (id) => {
    // Navega para a tela "EditListScreen" passando informações relevantes.
    navigation.navigate("EditList", {
      listId: id,
      editedListName: editedListName,
      onEditList: saveEditedList, // Passa a função para salvar a lista editada.
    });
  };

  const ItemList = (id) => {
    // Navega para a tela "ItemScreenList" passando informações relevantes, incluindo a lista.
    navigation.navigate("ItemList", {
      listId: id,
      list: list, // Passe a lista como um parâmetro.
      onEditList: saveEditedList,
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
      <Text style={styles.texto}>Home Screen</Text>
      <Button
      style={styles.texto}
        title="Add List"
        onPress={() => {
          navigation.navigate("AddList", {
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
            <TouchableOpacity style={styles.editarNameList} onPress={() => ItemList(list.id)}>
            <Text style={styles.editarNameList}>{list.name}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.editarBotao} onPress={() => editList(list.id)}>
            <Text style={styles.textoBotao}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.excluirBotao} onPress={() => deleteList(list.id)}>
            <Text style={styles.textoBotao}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
    editarBotao: {
      marginLeft: 16,
      marginTop: 20,
      marginRight: 16,
      backgroundColor: "#453831",
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 5,
      paddingBottom: 5,
      borderRadius: 10,
    },

    excluirBotao: {
        marginTop: 20,
        backgroundColor: "#BB0000",
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 5,
      paddingBottom: 5,
      borderRadius: 10,
    },

    textoBotao: {
        fontSize: 20,
        color: "#fffafa",
    },

    texto: {
        fontSize: 20,
    },

    listaNome: {
        fontSize: 20,
        marginTop: 20,
    }
  });

export default Home; // Exporta o componente HomeScreen para uso em outras partes da aplicação.
