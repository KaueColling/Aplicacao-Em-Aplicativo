// Importa os módulos necessários do React Native e outras bibliotecas.
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, TextInput } from "react-native";
import { format } from 'date-fns';
import AsyncStorage from "@react-native-async-storage/async-storage";

// O componente Home representa a tela inicial da aplicação.
function Home({ navigation }) {
  // Define estados para armazenar informações e interações do usuário.
  const [list, setList] = useState([]); // Estado não utilizado
  const [lists, setLists] = useState([]); // Estado que armazena a lista de listas
  const [listToEdit, setListToEdit] = useState(null); // Estado para indicar a lista sendo editada
  const [editedListName, setEditedListName] = useState(""); // Estado para armazenar o nome editado da lista

  // Efeito colateral para carregar as listas armazenadas no AsyncStorage durante a inicialização.
  useEffect(() => {
    const loadLists = async () => {
      try {
        // Tenta recuperar as listas salvas no AsyncStorage com a chave "lists".
        const savedLists = await AsyncStorage.getItem("lists");
        if (savedLists) {
          // Se as listas forem encontradas, elas são analisadas e definidas como estado.
          const parsedLists = JSON.parse(savedLists);
          const validatedLists = parsedLists.map((list) => ({
            ...list,
            createdAt: new Date(list.createdAt),
          }));
          setLists(validatedLists);
        }
      } catch (error) {
        console.error("Error loading lists: ", error);
      }
    };

    // Chama a função para carregar listas durante a inicialização.
    loadLists();
  }, []);

  // Função para adicionar uma nova lista.
  const addList = async (newListName) => {
    if (newListName) {
      // Cria uma nova lista com um ID único com base no timestamp atual.
      const newDateTime = new Date();
      const newList = {
        id: Date.now(),
        name: newListName,
        createdAt: newDateTime.getTime(), // Converte para um timestamp
      };

      // Atualiza o estado das listas incluindo a nova lista.
      const updatedLists = [...lists, newList];
      setLists(updatedLists);
    }
  };

  // Função para editar uma lista.
  const editList = (id) => {
    // Navega para a tela "EditListScreen" passando informações relevantes.
    navigation.navigate("EditList", {
      listId: id,
      editedListName: editedListName,
      onEditList: saveEditedList, // Passa a função para salvar a lista editada.
    });
  };

  // Função para navegar para a tela "ItemList" passando informações relevantes.
  const ItemList = (id) => {
    navigation.navigate("ItemList", {
      listId: id,
      list: list, // Passa a lista como um parâmetro (Não utilizado nesta versão).
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

      // Atualiza o estado com as listas editadas.
      setLists(updatedLists);

      try {
        // Salva as listas atualizadas no AsyncStorage.
        saveListsToStorage(updatedLists);
      } catch (error) {
        console.error("Error saving lists: ", error);
      }

      // Limpa a lista sendo editada e o nome editado da lista.
      setListToEdit(null);
      setEditedListName("");
    }
  };

  // Função para excluir uma lista.
  const deleteList = (id) => {
    // Filtra a lista a ser excluída da lista de listas.
    const updatedLists = lists.filter((list) => list.id !== id);

    // Atualiza o estado com a lista excluída.
    setLists(updatedLists);

    try {
      // Salva as listas atualizadas no AsyncStorage.
      saveListsToStorage(updatedLists);
    } catch (error) {
      console.error("Error saving lists: ", error);
    }
  };

  // Função para salvar as listas no AsyncStorage.
  const saveListsToStorage = async (listsToSave) => {
    try {
      // Converte e salva as listas em formato JSON no AsyncStorage com a chave "lists".
      await AsyncStorage.setItem("lists", JSON.stringify(listsToSave));
    } catch (error) {
      console.error("Error saving lists: ", error);
    }
  };

  // Renderiza a interface da tela HomeScreen.
  return (
    // Renderiza a tela inicial da aplicação.
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

      {/* Exibe um título na tela, indicando que é a Home Screen. */}
      <Text style={styles.texto}>Home Screen</Text>

      {/* Renderiza um botão "Add List" que permite a navegação para a tela de adição de lista. */}
      <TouchableOpacity style={styles.editarBotao}
        onPress={() => {

          // Navega para a tela "AddList" passando a função para adicionar lista.
          navigation.navigate("AddList", {
            onAddList: addList, // Função para adicionar uma nova lista.
          });
        }}>
        <Text style={styles.textoBotao}>Add Item</Text>
      </TouchableOpacity>

      {/* Mapeia e renderiza as listas existentes na interface. */}
      {lists.map((list) => (
        <View style={styles.editarView} key={list.id}>

          {/* Verifica se uma lista está sendo editada. */}
          {listToEdit === list.id ? (
            <View>

              {/* Exibe um campo de entrada para editar o nome da lista. */}
              <TextInput
                value={editedListName}
                onChangeText={(text) => setEditedListName(text)}
              />

              {/* Renderiza um botão "Save" para salvar as edições na lista. */}
              <Button title="Save" onPress={() => saveEditedList(list.id, editedListName)} />
            </View>
          ) : (
            <TouchableOpacity style={styles.editarList} onPress={() => ItemList(list.id)}>
              {/* Exibe o nome da lista como um link clicável para acessar a lista de itens. */}
              <Text style={styles.editarNameList}>{list.name}</Text>
              <Text>{format(list.createdAt, 'dd/MM/yyyy HH:mm:ss')}</Text>
            </TouchableOpacity>
          )}

          {/* Renderiza um botão "Edit" para editar a lista. */}
          <TouchableOpacity style={styles.editarBotao} onPress={() => editList(list.id)}>
            <Text style={styles.textoBotao}>Edit</Text>
          </TouchableOpacity>

          {/* Renderiza um botão "Delete" para excluir a lista. */}
          <TouchableOpacity style={styles.excluirBotao} onPress={() => deleteList(list.id)}>
            <Text style={styles.textoBotao}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

// Estilos CSS para a tela HomeScreen.
const styles = StyleSheet.create({
  editarBotao: {
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
    fontSize: 30,
  },

  editarNameList: {
    fontSize: 20,
  },

  editarView: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  editarList: {
    marginTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#87C4FF",
    borderRadius: 10,
    width: 200,
    display: "flex",
    alignItems: "center",
    alignContent: "flex-start",
  }
});

// Exporta o componente HomeScreen para uso em outras partes da aplicação.
export default Home;
