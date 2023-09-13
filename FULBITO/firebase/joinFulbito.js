import { Alert } from "react-native";
import { updateDoc, arrayUnion } from "firebase/firestore";
import firebase from "firebase/compat/app";

const joinFulbito = async (item, user, navigation) => {
  const db = firebase.firestore();
  //console.log(item);
  //console.log(user);
  try {
    // Crear o actualizar fulbitosJugados del usuario actual
    const userQuerySnapshot = await db
      .collection("users")
      .where("id", "==", user.id)
      .get();

    if (!userQuerySnapshot.empty) {
      const userDoc = userQuerySnapshot.docs[0];
      const userRef = db.collection("users").doc(userDoc.id);
      if (
        userDoc.data().playingFulbitos &&
        userDoc
          .data()
          .playingFulbitos.filter((fulbito) => fulbito.id === item.id).length >
          0
      ) {
        console.log("Already playing/request sent");
        return Alert.alert("Already playing/request sent");
      } else {
        // Reemplaza "user_id" por el ID del usuario actual
        await updateDoc(userRef, {
          playingFulbitos: arrayUnion({
            name: item.name,
            id: item.id,
            admin: item.admin,
            leagues: item.leagues,
            participants: item.participants,
            result: item.result,
            status: "pending",
          }),
        });
      }
    }
    // Crear o actualizar fulbitosRequest del admin
    const adminQuerySnapshot = await db
      .collection("users")
      .where("id", "==", item.admin.Id)
      .get();

    if (!adminQuerySnapshot.empty) {
      const adminDoc = adminQuerySnapshot.docs[0];
      const adminRef = db.collection("users").doc(adminDoc.id);

      // Reemplaza "user_id" por el ID del usuario actual

      await updateDoc(adminRef, {
        fulbitosRequest: arrayUnion({
          fulbitoName: item.name,
          fulbitoId: item.id,
          userNamePending: user.userName,
          userPendingId: user.id,
        }), // Reemplaza "user_id" por el ID del usuario actual
      });
    }
    Alert.alert("Fulbito request sent");
    return true;
  } catch (error) {
    console.log("Error joining Fulbito:", error);
  }
};

export default joinFulbito;
