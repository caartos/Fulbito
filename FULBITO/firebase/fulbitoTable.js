import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../database/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { Alert } from "react-native";
import axios from "axios";
import { API_KEY } from "@env";

const fulbitoTable = async (fulbito, user) => {
  console.log(fulbito);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = firebase.firestore();

  if (!fulbito) {
    return Alert.alert("User not found");
  }

  try {
    // Verificar si el nombre del Fulbito ya existe
    const fulbitoQuerySnapshot = await firestore
      .collection("fulbitos")
      .where("id", "==", fulbito.id)
      .get();

    if (!fulbitoQuerySnapshot.empty) {
      const fulbitoRef = fulbitoQuerySnapshot.docs[0];
      const actFulbito = fulbitoRef.data();

      const promises = actFulbito.participants.map(async (participant) => {
        console.log(participant);
        const userQuerySnapshot = await firestore
          .collection("users")
          .where("id", "==", participant.Id)
          .get();
        
        if(userQuerySnapshot.docs[0].data().predictions){
        const participantPred = userQuerySnapshot.docs[0].data().predictions;

        const keysToKeep = fulbito.leagues;
        const filteredPredictions = Object.keys(participantPred)
          .filter((key) => keysToKeep.includes(key))
          .reduce((obj, key) => {
            obj[key] = participantPred[key];
            return obj;
          }, {});
        let points = 0;

        async function obtenerDatos(objeto) {
          for (const liga in objeto) {
            let code;
            if (liga === "LigaProfesionalArgentina") {
              code = 128;
            } else if (liga === "PremierLeague") {
              code = 39;
            } else if (liga === "LaLiga") {
              code = 140;
            } else if (liga === "SeriaA") {
              code = 71;
            }else if (liga === "SeriaA") {
              code = 135;
            }
            const res = await axios.get(
              `https://v3.football.api-sports.io/fixtures?league=${code}&season=2023`,
              {
                headers: {
                  "x-rapidapi-key": API_KEY,
                  "x-rapidapi-host": "v3.football.api-sports.io",
                },
              }
            );
            const resFT = res.data.response.filter(
              (objeto) => objeto.fixture.status.short === "FT"
            );
            console.log(resFT);
            console.log(`Liga: ${liga}`);

            const rondas = objeto[liga];
            for (const ronda in rondas) {
              console.log(`Ronda: ${ronda}`);
              const partidos = rondas[ronda];
              console.log("PARTIDOS", partidos);
              for (const index in partidos) {
                const partido = partidos[index];
                console.log("PARTIDO", partido);
                if (
                  partido &&
                  partido.local &&
                  partido.visit &&
                  partido.prediction
                ) {
                  const partidosJugadosFecha = resFT.filter(
                    (obj) =>
                      obj.league.round === ronda &&
                      obj.teams.home.name == partido.local &&
                      obj.teams.away.name == partido.visit
                  );
                  console.log(partidosJugadosFecha);

                  const golesLocal = partidosJugadosFecha[0]
                    ? partidosJugadosFecha[0].goals.home
                    : null;
                  const golesVisit = partidosJugadosFecha[0]
                    ? partidosJugadosFecha[0].goals.away
                    : null;

                  if (partidosJugadosFecha[0]) {
                    let finalResult;
                    if (golesLocal > golesVisit) {
                      finalResult = "local";
                    } else if (golesLocal < golesVisit) {
                      finalResult = "visit";
                    } else {
                      finalResult = "draw";
                    }
                    if (finalResult == partido.prediction) {
                      points = points + 1;
                    } else {
                      points = points;
                    }
                    console.log("cada chequeo", points);
                  }
                }
              }
            }
          }
        }

        await obtenerDatos(filteredPredictions);
        participant.points = points;
        return participant;
      }else{
        participant.points=0
        return participant;
      }
      });

      const updatedParticipants = await Promise.all(promises);
      actFulbito.participants = updatedParticipants;
      console.log(actFulbito);
      return actFulbito;
    }
  } catch (error) {
    console.log("Error creating Fulbito:", error);
    Alert.alert("Error creating Fulbito");
  }
};

export default fulbitoTable;
