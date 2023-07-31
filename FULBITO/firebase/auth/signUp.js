import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../database/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { Alert } from "react-native";
import axios from "axios"

const signUp = (userName, firstName, lastName, email, password, navigation) => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = firebase.firestore();

    


  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);

      const userId = firestore.collection("users").doc().id;

      return firestore
        .collection("users")
        .doc(user.uid)
        .set({
          id: userId,
          userName: userName,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          
        });
    })
    .then(() => {
      console.log("Usuario guardado en Firestore");
      navigation.navigate("Main");
      Alert.alert("User Saved");
    })
    .catch((error) => {
      console.log("Error al crear el usuario:", error);
    });
};

export default signUp;
