import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../database/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { Alert } from "react-native";

const saveFixturePredictions = async (predictions, user) => {
  if (!predictions) {
    return Alert.alert("No predictions provided");
  }

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = firebase.firestore();

  if (!user) {
    return Alert.alert("User not found");
  }

  try {
    // Verificar si existen las predicciones en el usuario
    const userQuerySnapshot = await firestore
      .collection("users")
      .where("id", "==", user.id)
      .get();

    if (!userQuerySnapshot.empty) {
      const userDoc = userQuerySnapshot.docs[0];
      const userRef = firestore.collection("users").doc(userDoc.id);
      const userDocData = userDoc.data();

      await userRef.update({
        predictions,
      });
      
    }

    Alert.alert("Predictions saved");
  } catch (error) {
    console.log("Error saving predictions:", error);
    Alert.alert("Error saving predictions");
  }
};
export default saveFixturePredictions;

