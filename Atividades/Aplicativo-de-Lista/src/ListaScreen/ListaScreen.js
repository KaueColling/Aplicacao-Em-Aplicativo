import { useState, useEffect } from "react";
import { View, Text, Button, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


function ListaScreen({ navigation }) {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Add/Edit List Screen</Text>
                
            <Button
                title="Add List"
                onPress={() => { navigation.navigate("ListaScreen") }}
            />
        </View>
    );
}

export default ListaScreen;