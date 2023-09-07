import {
  getAuth,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../database/firebase";
import "firebase/compat/firestore";
import { Alert } from "react-native";

const resetPassword = (email) => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  return new Promise((resolve, reject) => {
    fetchSignInMethodsForEmail(auth, email)
      .then((signInMethods) => {
        if (signInMethods.length === 0) {
          // El email no está asociado a ninguna cuenta de usuario
          Alert.alert("Invalid Email.");
          reject("Invalid Email.");
        } else {
          sendPasswordResetEmail(auth, email)
            .then(() => {
              //console.log("Correo electrónico enviado para restablecer la contraseña.");
              Alert.alert(
                "Correo electrónico enviado para restablecer la contraseña."
              );
              resolve();
            })
            .catch((error) => {
              console.error(
                "Error al enviar el correo electrónico para restablecer la contraseña:",
                error
              );
              Alert.alert(
                "Error al enviar el correo electrónico para restablecer la contraseña."
              );
              reject(error);
            });
        }
      })
      .catch((error) => {
        console.erorr("Error al verificar el email:", error);
        Alert.alert("Error al verificar el email.");
        reject(error);
      });
  });
};

export default resetPassword;
