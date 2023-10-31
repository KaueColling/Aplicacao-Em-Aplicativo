// HomeScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen({ navigation }) {
  const [lists, setLists] = useState([]);

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
      const updatedLists = [...lists, newListName];
      setLists(updatedLists);
      saveListsToStorage(updatedLists);
    }
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
      {lists.map((list, index) => (
        <Text key={index}>{list}</Text>
      ))}
    </View>
  );
}

export default HomeScreen;
