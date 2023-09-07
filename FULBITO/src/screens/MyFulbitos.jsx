import React, { useContext, useState, useEffect } from "react";
import { FontContext } from "../../App";
import { Divider } from "@rneui/themed";
import Entypo from "react-native-vector-icons/Entypo";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { updateDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";
import { setUser } from "../../actions/userActions";

const MyFulbitos = () => {
  const { user } = useSelector((state) => state.user);
  const font = useContext(FontContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const db = firebase.firestore();

  const playingFulbitosPlaying = user.playingFulbitos
    ? user.playingFulbitos.filter((fulbito) => fulbito.status === "playing")
    : [];

  const playingFulbitosPending = user.playingFulbitos
    ? user.playingFulbitos.filter((fulbito) => fulbito.status === "pending")
    : [];

  const refreshUserData = async () => {
    try {
      const userDoc = await db
        .collection("users")
        .where("id", "==", user.id)
        .get();
      //console.log(userDoc.docs[0].data())
      if (userDoc.docs[0]) {
        const userData = userDoc.docs[0].data();
        setUser(userData);
      }
    } catch (error) {
      console.log("Error refreshing user data:", error);
    } finally {
      setLoading(false); // Cambiar el estado a false cuando termina la carga
    }
  };

  useEffect(() => {
    if (loading) {
      refreshUserData();
    }
  }, [loading]);

  const handleAccept = async (user, pendingUser) => {
    //console.log(pendingUser);
    try {
      const userQuerySnapshot = await db
        .collection("users")
        .where(
          "id",
          "==",
          user.id,
          "fulbitosRequest",
          "==",
          pendingUser.userPendingId
        )
        .get();
      //console.log(userQuerySnapshot.docs[0]);
      if (!userQuerySnapshot.empty) {
        const userDoc = userQuerySnapshot.docs[0];
        const userRef = db.collection("users").doc(userDoc.id);
        // const actPlayingFulbito = userDoc.data().playingFulbitos;
        // actPlayingFulbito
        //   .find((obj) => obj.id === pendingUser.fulbitoId)
        //   .participants.push({
        //     Id: pendingUser.userPendingId,
        //     userName: pendingUser.userNamePending,
        //   });

        await updateDoc(userRef, {
          playingFulbitos: userDoc.data().playingFulbitos.map((fulbito) =>
            fulbito.id === pendingUser.fulbitoId
              ? {
                  ...fulbito,
                  participants: [
                    ...fulbito.participants,
                    {
                      Id: pendingUser.userPendingId,
                      userName: pendingUser.userNamePending,
                    },
                  ],
                }
              : fulbito
          ),
          fulbitosRequest: userDoc
            .data()
            .fulbitosRequest.filter(
              (request) => request.fulbitoId !== pendingUser.fulbitoId
            ),
        });
      }

      const userPendingQuerySnapshot = await db
        .collection("users")
        .where(
          "id",
          "==",
          pendingUser.userPendingId,
          "playingFulbitos",
          "array-contains",
          { id: pendingUser.fulbitoId }
        )
        .get();
      //console.log(userPendingQuerySnapshot);
      //console.log(userPendingQuerySnapshot.docs[0]);
      //console.log(userPendingQuerySnapshot.docs[0].data());
      if (!userPendingQuerySnapshot.empty) {
        const userPendingDoc = userPendingQuerySnapshot.docs[0];

        const userPendingRef = db.collection("users").doc(userPendingDoc.id);
        //console.log(userPendingDoc);
        await updateDoc(userPendingRef, {
          playingFulbitos: userPendingDoc
            .data()
            .playingFulbitos.map((fulbito) =>
              fulbito.id === pendingUser.fulbitoId
                ? {
                    ...fulbito,
                    participants: [
                      ...fulbito.participants,
                      {
                        Id: pendingUser.userPendingId,
                        userName: pendingUser.userNamePending,
                      },
                    ],
                    status: "playing",
                  }
                : fulbito
            ),
        });
      }
      //console.log(user.id);

      const fulbitoQuerySnapshot = await db
        .collection("fulbitos")
        .where("id", "==", pendingUser.fulbitoId)
        .get();

      if (!fulbitoQuerySnapshot.empty) {
        const fulbitoDoc = fulbitoQuerySnapshot.docs[0];
        const fulbitoRef = db.collection("fulbitos").doc(fulbitoDoc.id);

        const existingParticipants = fulbitoDoc.data().participants || [];
        await updateDoc(fulbitoRef, {
          participants: [
            ...existingParticipants,
            {
              Id: pendingUser.userPendingId,
              userName: pendingUser.userNamePending,
            },
          ],
        });

        await setUser((prevUser) => ({
          ...prevUser,
          fulbitosRequest: prevUser.fulbitosRequest.filter(
            (request) => request.fulbitoId !== user.fulbitoId
          ),
        }));
        //console.log(user);
        console.log("Fulbito accepted successfully");
      }
      // Realizar acciones adicionales al aceptar el fulbito
    } catch (error) {
      console.log("Error accepting Fulbito:", error);
    }
    refreshUserData();
  };

  const handleReject = async (user, pendingUser) => {
    try {
      const userPendingQuerySnapshot = await db
        .collection("users")
        .where(
          "id",
          "==",
          pendingUser.userPendingId,
          "fulbitosJugados",
          "==",
          pendingUser.fulbitoId
        )
        .get();
      if (!userPendingQuerySnapshot.empty) {
        const userPendingDoc = userPendingQuerySnapshot.docs[0];
        const userPendingRef = db.collection("users").doc(userPendingDoc.id);
        await updateDoc(userPendingRef, {
          // await updateDoc(userRef, {
          //   fulbitosRequest: userDoc
          //     .data()
          //     .fulbitosRequest.filter(
          //       (request) => request.fulbitoId !== pendingUser.fulbitoId
          //     ),
          // }
          fulbitosJugados: userPendingDoc
            .data()
            .fulbitosJugados.filter(
              (fulbito) => fulbito.id !== pendingUser.fulbitoId
            ),
        });
        await setUser((prevUser) => ({
          ...prevUser,
          fulbitosRequest: prevUser.fulbitosRequest.filter(
            (request) => request.fulbitoId !== user.fulbitoId
          ),
        }));
      }

      const userQuerySnapshot = await db
        .collection("users")
        .where(
          "id",
          "==",
          user.id,
          "fulbitosRequest",
          "==",
          pendingUser.userPendingId
        )
        .get();
      if (!userQuerySnapshot.empty) {
        const userDoc = userQuerySnapshot.docs[0];
        const userRef = db.collection("users").doc(userDoc.id);
        //console.log(userDoc.data().fulbitosRequest);
        //console.log(pendingUser.fulbitoId);
        await updateDoc(userRef, {
          fulbitosRequest: userDoc
            .data()
            .fulbitosRequest.filter(
              (request) => request.fulbitoId !== pendingUser.fulbitoId
            ),
        });
        await setUser((prevUser) => ({
          ...prevUser,
          fulbitosRequest: prevUser.fulbitosRequest.filter(
            (request) => request.fulbitoId !== user.fulbitoId
          ),
        }));
      }
    } catch (error) {
      console.log("Error accepting Fulbito:", error);
    }
  };

  const handleAcceptRequest = async (user, pendingUser, index) => {
    await handleAccept(user, pendingUser);
    setUser((prevUser) => ({
      ...prevUser,
      fulbitosRequest: prevUser.fulbitosRequest.filter(
        (item, i) => i !== index
      ),
    }));
    refreshUserData();
  };

  const handleRejectRequest = async (user, pendingUser, index) => {
    await handleReject(user, pendingUser);
    setUser((prevUser) => ({
      ...prevUser,
      fulbitosRequest: prevUser.fulbitosRequest.filter(
        (item, i) => i !== index
      ),
    }));
    refreshUserData();
  };
  // Eliminar la solicitud aceptada de la lista de fulbitosRequest en el estado

  const styles = StyleSheet.create({
    image: {
      width: "100%",
      height: "100%",
    },
    mainTilte: {
      fontFamily: font.fontFamily["bold"],
      fontSize: 22,
      textAlign: "center",
      color: "#1d4b26",
      margin: 20,
    },
    tilte: {
      fontFamily: font.fontFamily["bold"],
      fontSize: 22,
      textAlign: "center",
      color: "#1d4b26",
      margin: 2,
    },
    checkTilte: {
      fontFamily: font.fontFamily["bold"],
      fontSize: 22,
      textAlign: "left",
      color: "#1d4b26",
      margin: 2,
    },
    button: {
      borderRadius: 5,
      borderColor: "#1d4b26",
      borderWidth: 2,
      backgroundColor: "#a681ef",
      width: 40,
      height: 40,
    },
    buttonText: {
      color: "#baffc9",
      fontFamily: font.fontFamily["bold"],
      fontSize: 20,
      textAlign: "center",
      padding: 8,
    },
    textInput: {
      height: 40,
      margin: 10,
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      width: 200,
      alignSelf: "center",
      borderColor: "#1d4b26",
      borderWidth: 2,
    },
    container: {
      justifyContent: "space-between",
      alignItems: "center",
    },
    checkBoxLeague: {
      color: "#1d4b26",
      fontFamily: font.fontFamily["regular"],
      fontSize: 20,
      textAlign: "center",
      padding: 8,
    },
    divider: {
      color: "#1d4b26",
      width: "50%",
      marginTop: 30,
      marginBottom: 30,
      borderWidth: "1px",
      alignSelf: "center",
    },
  });

  return (
    <ImageBackground
      source={require("../../public/images/fondoApp.png")} // Reemplaza 'ruta_de_tu_imagen.jpg' con la ruta de tu imagen
      style={styles.image} // Ajusta el ancho y alto según tus necesidades
      resizeMode="cover"
    >
      <ScrollView style={{ flex: "0.9", marginTop: 60 }}>
        <Text style={[styles.mainTilte, { marginBottom: 40, fontSize: 30 }]}>
          My FULBITOS
        </Text>
        <View
          style={{
            backgroundColor: "#cef5bb",
            width: "80%",
            height: "auto",
            justifyContent: "center",
            alignSelf: "center",
            borderRadius: 5,
            paddingTop: 10,
            paddingBottom: 10,
            borderColor: "#1d4b26",
            borderWidth: "1px",
          }}
        >
          <Text style={[styles.tilte]}>Playing FULBITOS</Text>
          {playingFulbitosPlaying.length > 0
            ? playingFulbitosPlaying.map((fulbito, i) => (
                <TouchableOpacity
                  key={fulbito.id}
                  onPress={() => navigation.navigate("Fulbito", fulbito)}
                >
                  <View
                    style={{ flexDirection: "row", justifyContent: "left" }}
                  >
                    <Text
                      style={[
                        styles.checkBoxLeague,
                        { width: "100%", textAlign: "left" },
                      ]}
                    >
                      <Text style={{ fontWeight: "bold" }}>{i + 1}.</Text>{" "}
                      {fulbito.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            : null}
        </View>
        <Divider style={styles.divider} />
        <View
          style={{
            backgroundColor: "#e8e8e0",
            width: "80%",
            height: "auto",
            justifyContent: "center",
            alignSelf: "center",
            borderRadius: 5,
            paddingTop: 10,
            paddingBottom: 10,
            borderColor: "#1d4b26",
            borderWidth: "1px",
          }}
        >
          <Text style={[styles.tilte]}>JOIN REQUESTS</Text>
          {user.fulbitosRequest
            ? user.fulbitosRequest.map((request, i) => (
                <View
                  key={i}
                  style={{
                    maxWidth: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "60%", alignSelf: "left" }}>
                    <Text style={[styles.checkTilte]}>
                      <Text style={styles.checkBoxLeague}>Join</Text>
                      {" " + request.userNamePending + " "}
                      <Text style={styles.checkBoxLeague}>to</Text>
                      {" " + request.fulbitoName}?
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "40%",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() =>
                        handleAcceptRequest(user, user.fulbitosRequest[i], i)
                      }
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Entypo name="check" size={40} color={"#baffc9"} />
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.button,
                        { marginLeft: 10, marginRight: 10 },
                      ]}
                      onPress={() =>
                        handleRejectRequest(user, user.fulbitosRequest[i], i)
                      }
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Entypo name="cross" size={40} color={"#baffc9"} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            : null}
        </View>
        <Divider style={styles.divider} />
        <View
          style={{
            backgroundColor: "#e8e8e0",
            width: "80%",
            height: "auto",
            justifyContent: "center",
            alignSelf: "center",
            borderRadius: 5,
            paddingTop: 10,
            paddingBottom: 10,
            borderColor: "#1d4b26",
            borderWidth: "1px",
          }}
        >
          <Text style={[styles.tilte]}>Pending FULBITOS</Text>
          {playingFulbitosPending.length > 0
            ? playingFulbitosPending.map((fulbito, i) => (
                <View
                  key={i}
                  style={{ flexDirection: "row", justifyContent: "left" }}
                >
                  <View>
                    <Text
                      style={[
                        styles.checkBoxLeague,
                        { width: "100%", textAlign: "left" },
                      ]}
                    >
                      <Text style={{ fontWeight: "bold" }}>{i + 1}.</Text>{" "}
                      {fulbito.name}
                    </Text>
                  </View>
                </View>
              ))
            : null}
        </View>

        <TouchableOpacity>
          <Text
            style={[styles.mainTilte, { marginTop: 70, marginBottom: 50 }]}
            onPress={() => navigation.navigate("LoggedPage")}
          >
            RETURN
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default MyFulbitos;
