import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import auth from "@react-native-firebase/auth";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
export const firebaseConfig = {
  apiKey: "AIzaSyCUB7DyohCL3OVaL2H7tO7y2ln0lpW5ZDU",

  authDomain: "fulbito-firebase.firebaseapp.com",

  projectId: "fulbito-firebase",

  storageBucket: "fulbito-firebase.appspot.com",

  messagingSenderId: "173895991686",

  appId: "1:173895991686:web:726f0875f3d2bb2dc6ac07",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = firebaseApp.firestore();

export default {
    firestore,
    auth,
    firebaseApp
};

export const signUp = async (email, password) => {
  try {
    await auth().createUserWithEmailAndPassword(
      userName,
      firstName,
      lastName,
      email,
      password
    );
    console.log("Usuario creado exitosamente");
  } catch (error) {
    console.log("Error al crear el usuario", error);
  }
  await db.db.collection("users").add({
    userName,
    firstName,
    lastName,
    email,
    password,
  });
};

export const signIn = async (email, password) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    console.log("Inicio de sesión exitoso");
  } catch (error) {
    console.log("Error al iniciar sesión", error);
  }
};

export const signOut = async () => {
  try {
    await auth().signOut();
    console.log("Cierre de sesión exitoso");
  } catch (error) {
    console.log("Error al cerrar sesión", error);
  }
};
