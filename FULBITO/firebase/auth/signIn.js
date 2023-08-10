import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../database/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { Alert } from "react-native";

const signIn =  (email, password, navigation) => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = firebase.firestore();

  return new Promise ((resolve, reject) => {
    signInWithEmailAndPassword (auth, email, password)
      .then(async(userCredential) => {
        const  user =  userCredential.user;
        const userEmail = user.email;

        if (!user.emailVerified) {
          Alert.alert("Missing email verification, check your email inbox");
          reject("Email not verified.");
          return;
        }
        
        firestore
          .collection("users")
          .where("email", "==", userEmail)
          .get()
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              const userData = querySnapshot.docs[0].data();
              resolve(userData);
            } else {
              //console.log("User not found");
              Alert.alert("User not found");
              reject("User not found");
            }
          })
          .catch((error) => {
            console.log("Error retrieving user data:", error);
            Alert.alert("Error retrieving user data");
            reject("Error retrieving user data");
          });
      })
      .catch((error) => {
        console.log("Wrong email/password", error);
        Alert.alert("Wrong email/password");
        reject("Wrong email/password");
      });
  });
};

export default signIn;
