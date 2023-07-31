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

      // Verificar si existen las predicciones en el usuario
      //if (!userDocData.predictions) {
      // Si no existen, crear un objeto "predictions" y asignarle el valor recibido
      await userRef.update({
        predictions,
      });
      //} else {
      // Si existen las predicciones, verificar y actualizar los valores
      // console.log(predictions)
      // for (const league in predictions) {
      //   if (predictions.hasOwnProperty(league)) {
      //     if (!userDocData.predictions[league]) {
      //       // Si no existe la liga, crearla y asignarle las predicciones del round
      //       await userRef.update({
      //         [`predictions.${league}`]: predictions[league],
      //       });
      //     } else {
      //       // Si existe la liga, verificar el round
      //       const leaguePredictions = predictions[league];
      //       console.log("[league]", league)
      //       //EL ERROR PUEDE SER DE ACA
      //       //HAY QUE CHEQUEAR SI VIENE DEL ARRAY CREADO CUANDO SE CREA PREDICTION handleCheckboxChange

      //       console.log("LEAGUE PREDICTIONS",leaguePredictions)

      //        const userLeaguePredictions = userDocData.predictions[league];
      //        console.log("userleaguepred", userLeaguePredictions);
      //        const roundKeys = Object.keys(userLeaguePredictions);
      //        console.log("roundkeys", roundKeys);

      //        for (const roundKey of roundKeys) {
      //          const newValue = leaguePredictions[roundKey];
      //          console.log("NEW", newValue);

      //  let currentValueArray = [];
      //  let maxIndex = Math.max(...Object.keys(leaguePredictions));

      //  for (let i = 0; i <= maxIndex; i++) {
      //   currentValueArray.push(leaguePredictions[i] || "");
      //  }
      //  console.log("CURRENT", currentValueArray)

      // console.log("PREDICTIONS", predictions)

      // const finalPredArray =[]
      // for (let i = 0; i < currentValueArray.length; i++) {
      //   if(currentValueArray[i]== ""){
      //     finalPredArray.push(newValue[i])
      //   }else if(currentValueArray[i]!== "" & newValue[i] !== ""){
      //     finalPredArray.push(newValue[i])
      //   }else{
      //     finalPredArray.push(currentValueArray[i])
      //   }
      //   }

      // function arrayToObject(arr) {
      //                      const obj = {};

      //                      for (let i = 0; i < arr.length; i++) {

      //                         obj[i] = arr[i];

      //                     }

      //                     return obj;
      //                    }
      // let predictObject = arrayToObject(finalPredArray);
      //   console.log(predictObject)
      //   console.log([predictions.league.roundKey])

      //         await userRef.update({
      //           [`predictions.${league}.${roundKey}`]: newValue,
      //        });
      //     }}
      //   }
      // }
      //}
    }

    Alert.alert("Predictions saved");
  } catch (error) {
    console.log("Error saving predictions:", error);
    Alert.alert("Error saving predictions");
  }
};
export default saveFixturePredictions;

//despues de obtener el user tengo que ver si existe predictions dentro del user, si no existe
// crear un objeto predictions y darle el valor que viene como predictions. Si ya
//existe hay que ver si existe la liga que estoy usando, si no existe crear la liga,
//luego el round, si no exsite hay que darle el valor de round,
// y si existe hay que comprar uno por uno los items del array, si es "" lo reemplazo
//por el entrante si es distinto de "", si tiene un  distinto de "", lo reemplazo
//por el valor entrante si es distinto de "" y distinto del actual
// if (!userQuerySnapshot.empty) {
//   const userDoc = userQuerySnapshot.docs[0];
//   const userRef = firestore.collection("users").doc(userDoc.id);
//   const userDocData = userDoc.data();

//   // Verificar si existen las predicciones en el usuario
//   if (!userDocData.predictions) {
//     // Si no existen, crear un objeto "predictions" y asignarle el valor recibido
//     await userRef.update({
//       predictions: predictions,
//     });
//   } else {
//     // Si existen las predicciones, verificar y actualizar los valores
//     for (const league in predictions) {
//       if (predictions.hasOwnProperty(league)) {
//         if (!userDocData.predictions[league]) {
//           // Si no existe la liga, crearla y asignarle las predicciones del round
//           await userRef.update({
//             [`predictions.${league}`]: predictions[league],
//           });
//         } else {
//           // Si existe la liga, verificar el round
//           const leaguePredictions = predictions[league];
//           const userLeaguePredictions = userDocData.predictions[league];
//           const roundKeys = Object.keys(leaguePredictions);

//           for (const roundKey of roundKeys) {
//             const newValue = leaguePredictions[roundKey];
//             const currentValue = userLeaguePredictions[roundKey];

//             // Verificar y actualizar los valores del round
//             if (newValue !== "" && newValue !== currentValue) {
//               await userRef.update({
//                 [`predictions.${league}.${roundKey}`]: newValue,
//               });
//             }
//           }
//         }
//       }
//     }
//   }
// }

//                 console.log("CURRENT", currentValue);
//                 let predictArray = [];

//                 // Construir el objeto con los valores actualizados
//                 for (let i = 0; i < currentValue.length; i++) {
//                   if(currentValue[i] ==! newValue[i]){
//                     predictArray.push(newValue[i])
//                   }else{
//                     predictArray.push(currentValue[i])
//                   }
//                 }
//                 console.log(predictArray)
//               function arrayToObject(arr) {
//                   const obj = {};

//                   for (let i = 0; i < arr.length; i++) {

//                       obj[i] = arr[i];

//                   }

//                   return obj;
//                 }

//                 const predictObject = arrayToObject(predictArray)
