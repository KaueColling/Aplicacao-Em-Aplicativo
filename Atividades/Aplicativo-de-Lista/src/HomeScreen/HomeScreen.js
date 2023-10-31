import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen({ navigation }) {
  const [lists, setLists] = useState([]);
  const [listToEdit, setListToEdit] = useState(null); // Para rastrear a lista sendo editada
  const [editedListName, setEditedListName] = useState(""); // Para rastrear o nome editado

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

  const editList = (id) => {
    setListToEdit(id);
    const listToEdit = lists.find((list) => list.id === id);
    if (listToEdit) {
      setEditedListName(listToEdit.name);
    }
  };

  const saveEditedList = () => {
    if (listToEdit !== null && editedListName.trim() !== "") {
      const updatedLists = lists.map((list) =>
        list.id === listToEdit ? { ...list, name: editedListName } : list
      );
      setLists(updatedLists);
      saveListsToStorage(updatedLists);
      setListToEdit(null);
      setEditedListName("");
    }
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
