import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useSelector } from "react-redux";
import createFulbito from "../firebase/createFulbito";
import { Alert } from "react-native";

export function useCreateNewFulbito({fulbitoName, selectedItems}) {
    const { user } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
  
    const createNewFulbito = async () => {
      setLoading(true);
      try {
        await createFulbito(fulbitoName, selectedItems, user);
        navigation.navigate("MyFulbitos");
      } catch (error) {
        // Maneja cualquier error que ocurra durante la creación del fulbito
        console.error(error);
        Alert.alert("Error creating Fulbito");
      } finally {
        setLoading(false);
      }
    };
  
    return { createNewFulbito, loading };
  }
  