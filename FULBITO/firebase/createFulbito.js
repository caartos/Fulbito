import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../database/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { Alert } from "react-native";

const createFulbito = async (fulbitoName, selectedItems, user, navigation) => {
  if (fulbitoName === "") {
    return Alert.alert("Fulbito name is required");
  }
  console.log(selectedItems);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = firebase.firestore();

  if (!user) {
    return Alert.alert("User not found");
  }

  try {
    // Verificar si el nombre del Fulbito ya existe
    const fulbitoQuerySnapshot = await firestore
      .collection("fulbitos")
      .where("name", "==", fulbitoName)
      .get();

    if (!fulbitoQuerySnapshot.empty) {
      return Alert.alert("Fulbito name already exists");
    }
    
    // Crear el documento de Fulbito
    const fulbitoRef = firestore.collection("fulbitos").doc();

    const fulbitoId = fulbitoRef.id;

    const fulbitoData = {
      id: fulbitoId,
      name: fulbitoName,
      leagues: selectedItems,
      participants: [{ userName: user.userName, Id: user.id }], // Agregar al creador en la lista de participantes
      admin: { userName: user.userName, Id: user.id },
      result: {}, // Objeto vacío para almacenar los resultados posteriormente
    };

    await fulbitoRef.set(fulbitoData);

    // Actualizar el modelo de usuario con el Fulbito jugado
    const userQuerySnapshot = await firestore
      .collection("users")
      .where("id", "==", user.id)
      .get();

    if (!userQuerySnapshot.empty) {
      const userDoc = userQuerySnapshot.docs[0];
      const userRef = firestore.collection("users").doc(userDoc.id);
      
      await userRef.update({
        playingFulbitos: firebase.firestore.FieldValue.arrayUnion({
          name: fulbitoName,
          id: fulbitoId,
          status: "playing",
          leagues: selectedItems,
          participants: [{ userName: user.userName, Id: user.id }],
          admin: { userName: user.userName, Id: user.id },
        }),
      });
    }
    Alert.alert("Fulbito created");
  } catch (error) {
    console.log("Error creating Fulbito:", error);
    Alert.alert("Error creating Fulbito");
  }
};

export default createFulbito;
