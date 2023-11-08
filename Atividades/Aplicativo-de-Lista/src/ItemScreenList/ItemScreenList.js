import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ItemScreenList({ navigation, route }) {
  const { listId, list } = route.params;
  const [items, setItems] = useState([]);  
  const [itemToEdit, setItemToEdit] = useState(null);
  const [editedItemName, setEditedItemName] = useState("");

  useEffect(() => {
    async function loadItems() {
      try {
        const savedItems = await AsyncStorage.getItem(`Items_${listId}`);
        if (savedItems) {
          const parsedItems = JSON.parse(savedItems);
          setItems(parsedItems);
        }
      } catch (error) {
        console.error("Error loading Items: ", error);
      }
    }

    loadItems();
  }, [listId]);

  const addItem = (newItemName) => {
    if (newItemName) {
      const newItem = { id: Date.now(), name: newItemName };
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      saveItemsToStorage(updatedItems);
    }
  }

  const editItem = (id) => {
    navigation.navigate("EditItem", {
      ItemId: id,
      editedItemName: editedItemName,
      onEditItem: saveEditedItem,
    });
  };

  const saveEditedItem = (ItemId, newName) => {
    if (ItemId !== null && newName.trim() !== "") {
      const updatedItems = items.map((item) =>
        item.id === ItemId ? { ...item, name: newName } : item
      );
      setItems(updatedItems);
      saveItemsToStorage(updatedItems);
      setItemToEdit(null);
      setEditedItemName("");
    }
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((item) =>
      item.id !== id
    );
    setItems(updatedItems);
    saveItemsToStorage(updatedItems);
  };

  const saveItemsToStorage = async (ItemsToSave) => {
    try {
      const key = `Items_${listId}`;
      await AsyncStorage.setItem(key, JSON.stringify(ItemsToSave));
    } catch (error) {
      console.error("Error saving Items: ", error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.texto}>Item List {list.name}</Text>
      <Button
        title="Add Item"
        onPress={() => {
          navigation.navigate("AddItem", {
            onAddItem: addItem,
          });
        }}
      />
      {items.map((item) => (
        <View key={item.id} style={{ flexDirection: "row", alignItems: "center" }}>
          {itemToEdit === item.id ? (
            <View>
              <TextInput
                value={editedItemName}
                onChangeText={(text) => setEditedItemName(text)}
              />
              <Button title="Save" onPress={() => saveEditedItem(item.id, editedItemName)} />
            </View>
          ) : (
            <Text style={styles.editarNameItem}>{item.name}</Text>
          )}
          <TouchableOpacity style={styles.editarBotao} onPress={() => editItem(item.id)}>
            <Text style={styles.textoBotao}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.excluirBotao} onPress={() => deleteItem(item.id)}>
            <Text style={styles.textoBotao}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
});

export default ItemScreenList;
