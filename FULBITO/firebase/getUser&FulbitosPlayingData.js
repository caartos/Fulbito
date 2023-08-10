import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "../database/firebase";

import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getUserData = async (id) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("id", "==", id))
    );
   
    const filteredUser = [];
    querySnapshot.forEach((doc) => {
      return filteredUser.push(doc.data());
    });
    //console.log(filteredUser[0].fulbitosJugados);
    if (filteredUser.length ==! "undefined") {
      const fulbitosJugadosIds = filteredUser[0].fulbitosJugados;

      const playing = [];
      const pending = [];
      const fulbitosStatusPlaying = filteredUser[0].fulbitosJugados.map(
        (fulbito) => {
          if (fulbito.status === "playing") {
            playing.push(fulbito);
          } else if (fulbito.status === "pending") {
            pending.push(fulbito);
          }
        }
      );

      const fulbitosPlaying = [];
      const fulbitosPending = [];

      if (playing && playing.length > 0) {
        for (const fulbitoItem of playing) {
          const fulbitoId = fulbitoItem.fulbitosJugadosId;
          const fulbitoDoc = await getDoc(doc(db, "fulbitos", fulbitoId));

          if (fulbitoDoc.exists()) {
            const fulbitoData = fulbitoDoc.data();
            fulbitosPlaying.push({
              fulbitosJugadosId: fulbitoId,
              status: fulbitoItem.status,
              ...fulbitoData,
            });
          }
        }
      }

      if (pending && pending.length > 0) {
        for (const fulbitoItem of pending) {
          const fulbitoId = fulbitoItem.fulbitosJugadosId;
          const fulbitoDoc = await getDoc(doc(db, "fulbitos", fulbitoId));

          if (fulbitoDoc.exists()) {
            const fulbitoData = fulbitoDoc.data();
            fulbitosPending.push({
              fulbitosJugadosId: fulbitoId,
              status: fulbitoItem.status,
              ...fulbitoData,
            });
          }
        }
      }

      return [filteredUser[0], fulbitosPlaying, fulbitosPending];
    } else {
      return [filteredUser[0]];
    }
  } catch (error) {
    console.error("Error al obtener la información del usuario:", error);
    return null;
  }
};

export default getUserData;
