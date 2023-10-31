import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity, TextInput } from "react-native"; // Adicione a importação do TextInput
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen({ navigation }) {
  const [lists, setLists] = useState([]);
  const [listToEdit, setListToEdit] = useState(null); // Para rastrear a lista sendo editada

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
  };

  const editList = (id, newName) => {
    const updatedLists = lists.map((list) =>
      list.id === id ? { ...list, name: newName } : list
    );
    setLists(updatedLists);
    saveListsToStorage(updatedLists);
    setListToEdit(null);
  };

  const deleteList = (id) => {
    const updatedLists = lists.filter((list) => list.id !== id);
    setLists(updatedLists);
    saveListsToStorage(updatedLists);
  };

  const saveListsToStorage = async (listsToSave) => {
    try {
      await AsyncStorage.setItem("lists", JSON.stringify(listsToSave));
    } catch (error) {
      console.error("Error saving lists: ", error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Add List"
        onPress={() => {
          navigation.navigate("ListaScreen", {
            onAddList: addList,
          });
        }}
      />
      {lists.map((list) => (
        <View key={list.id} style={{ flexDirection: "row", alignItems: "center" }}>
          {listToEdit === list.id ? (
            <View>
              <TextInput
                value={list.name}
                onChangeText={(text) => editList(list.id, text)}
              />
              <Button title="Save" onPress={() => setListToEdit(null)} />
            </View>
          ) : (
            <Text>{list.name}</Text>
          )}
          <TouchableOpacity onPress={() => setListToEdit(list.id)}>
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
