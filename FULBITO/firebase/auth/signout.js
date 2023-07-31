import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../database/firebase";
import { Alert } from "react-native";

const logOut = (navigation) => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  signOut(auth)
    .then(() => {
      console.log("Signed Out");
      navigation.navigate("Main");
    })
    .catch((error) => {
      console.log("Error al crear el usuario:", error);
      Alert.alert(error.message);
    });
};

export default logOut;
