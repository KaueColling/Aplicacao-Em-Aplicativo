import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ItemScreenList({ navigation, route }) {
  // Extrai os parâmetros de navegação (navigation) e rota (route)
  const { listId, list } = route.params;

  // Estado para armazenar os itens da lista
  const [items, setItems] = useState([]);

  // Estado para controlar a edição de um item
  const [itemToEdit, setItemToEdit] = useState(null);

  // Estado para armazenar o nome editado do item
  const [editedItemName, setEditedItemName] = useState("");

  // Efeito de carregamento dos itens da lista a partir do AsyncStorage
  useEffect(() => {
    async function loadItems() {
      try {
        // Tenta carregar os itens salvos no AsyncStorage com base no ID da lista
        const savedItems = await AsyncStorage.getItem(`Items_${listId}`);
        if (savedItems) {
          // Se os itens forem encontrados, converte-os de JSON para objetos JavaScript
          const parsedItems = JSON.parse(savedItems);
          // Atualiza o estado 'items' com os itens carregados
          setItems(parsedItems);
        }
      } catch (error) {
        // Em caso de erro, registra o erro no console
        console.error("Error loading Items: ", error);
      }
    }

    // Chama a função de carregamento de itens quando o ID da lista muda
    // (neste caso, apenas na primeira renderização)
    loadItems();
  }, [listId]);

  // Função para adicionar um novo item à lista
  const addItem = (newItemName) => {
    if (newItemName) {
      // Cria um novo item com um ID único (baseado na data atual) e o nome fornecido
      const newItem = { id: Date.now(), name: newItemName };
      // Atualiza o estado 'items' com o novo item adicionado
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      // Salva os itens atualizados no AsyncStorage
      saveItemsToStorage(updatedItems);
    }
  }

  // Função para editar um item
  const editItem = (id) => {
    // Navega para a tela "EditItem" passando informações relevantes
    navigation.navigate("EditItem", {
      ItemId: id,
      editedItemName: editedItemName,
      onEditItem: saveEditedItem,
    });
  };

  // Função para salvar as alterações feitas em um item
  const saveEditedItem = (ItemId, newName) => {
    if (ItemId !== null && newName.trim() !== "") {
      // Mapeia os itens e atualiza o item editado
      const updatedItems = items.map((item) =>
        item.id === ItemId ? { ...item, name: newName } : item
      );
      // Atualiza o estado 'items' com os itens editados
      setItems(updatedItems);
      // Salva os itens atualizados no AsyncStorage
      saveItemsToStorage(updatedItems);
      // Limpa os campos relacionados à edição
      setItemToEdit(null);
      setEditedItemName("");
    }
  };

  // Função para excluir um item da lista
  const deleteItem = (id) => {
    // Filtra o item a ser excluído da lista de itens
    const updatedItems = items.filter((item) =>
      item.id !== id
    );
    // Atualiza o estado 'items' com a lista de itens atualizada
    setItems(updatedItems);
    // Salva os itens atualizados no AsyncStorage
    saveItemsToStorage(updatedItems);
  };

  // Função para salvar os itens no AsyncStorage
  const saveItemsToStorage = async (ItemsToSave) => {
    try {
      // Define a chave para armazenar os itens com base no ID da lista
      const key = `Items_${listId}`;
      // Converte e salva os itens em formato JSON no AsyncStorage
      await AsyncStorage.setItem(key, JSON.stringify(ItemsToSave));
    } catch (error) {
      // Em caso de erro, registra o erro no console
      console.error("Error saving Items: ", error);
    }
  };

  return (
    // O componente View é um contêiner flexível que ocupa todo o espaço da tela.
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

      {/* Exibe o título da lista, que inclui o nome da lista atual (list.name). */}
      <Text style={styles.texto}>Item List {list.name}</Text>

      {/* Botão "Add Item" que, quando pressionado, navegará para a tela "AddItem". */}
      <TouchableOpacity style={styles.editarBotao} 
      onPress={() => {
        navigation.navigate("AddItem", {
          onAddItem: addItem,
        });
      }}>
        <Text style={styles.textoBotao}>Add Item</Text>
      </TouchableOpacity>

      {/* Mapeia a lista de itens (items) e renderiza cada item na lista. */}
      {items.map((item) => (
        <View key={item.id} style={{ flexDirection: "row", alignItems: "center" }}>

          {/* Verifica se o item está sendo editado (itemToEdit === item.id). */}
          {itemToEdit === item.id ? (
            <View>

              {/* Exibe um campo de entrada TextInput para editar o nome do item (editedItemName). */}
              <TextInput
                value={editedItemName}
                onChangeText={(text) => setEditedItemName(text)}
              />

              {/* Botão "Save" para salvar as alterações feitas no nome do item. */}
              <Button title="Save" onPress={() => saveEditedItem(item.id, editedItemName)} />

            </View>
          ) : (
            <View style={styles.editarItem}>
              {/* Se o item não estiver sendo editado, exibe o nome do item. */}
              <Text style={styles.editarNameItem}>{item.name}</Text>
            </View>
          )}

          {/* Botão "Edit" que permite editar o nome do item. */}
          <TouchableOpacity style={styles.editarBotao} onPress={() => editItem(item.id)}>
            <Text style={styles.textoBotao}>Edit</Text>
          </TouchableOpacity>

          {/* Botão "Delete" que permite excluir o item. */}
          <TouchableOpacity style={styles.excluirBotao} onPress={() => deleteItem(item.id)}>
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

  editarNameItem: {
    fontSize: 20,
  },

  editarItem: {
    marginTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#A7E7F6",
    borderRadius: 10,
    width: 200,
    display: "flex",
    alignItems: "center",
    alignContent: "flex-start",
  }
});

export default ItemScreenList;
