import React, { useContext, useState } from "react";
import { UserContext } from "./../../context/UserContext";
import { FontContext } from "../../App";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Alert,
} from "react-native";
import searchFulbito from "../../firebase/searchFulbito";
import { useNavigation } from "@react-navigation/native";
import { updateDoc, arrayUnion } from "firebase/firestore";
import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";

const SearchNewFulbito = () => {
  const { user } = useSelector((state) => state.user);
  const font = useContext(FontContext);
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const db = firebase.firestore();

  const handleSearch = (text) => {
    //console.log(text)
    setSearchText(text);
    if (text === "") {
      setFilteredData(null); // Si el campo de búsqueda está vacío, establece filteredData como null
    } else {
      searchFulbito(text, (searchData) => {
        setFilteredData(searchData);
      });
    }
  };

  const handleSelectOption = (item) => {
    setSelectedItemId(item);
    //console.log("Selected item:", item);
    // Realizar acciones adicionales al seleccionar una opción
  };

  const handleJoinFulbito = async (item, user) => {
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
            .playingFulbitos.filter((fulbito) => fulbito.id === item.id)
            .length > 0
        ) {
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
      //console.log("Fulbito joined successfully");
      Alert.alert("Fulbito request sent");
      navigation.navigate("LoggedPage");
    } catch (error) {
      console.log("Error joining Fulbito:", error);
    }
  };

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
      alignSelf: "center",
      width: "100%",
    },
    button: {
      borderRadius: 5,
      borderColor: "#1d4b26",
      borderWidth: 2,
      backgroundColor: "#a681ef",
      width: 150,
      height: 40,
      marginTop: 60,
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
      alignSelf: "center",
      color: "#1d4b26",
      fontFamily: font.fontFamily["regular"],
      fontSize: 20,
      textAlign: "center",
      padding: 8,
    },
    buttonCreate: {
      borderRadius: 5,
      borderColor: "#1d4b26",
      borderWidth: 2,
      backgroundColor: "#a681ef",
      width: 220,
      height: "auto",
      marginTop: 40,
      padding: 8,
    },
    resultItem: {
      padding: 10,
      marginVertical: 5,
      borderRadius: 5,
      alignSelf: "center",
      width: "75%",
    },
    selectedItem: {
      width: "75%",
      backgroundColor: "#61ec69",
      borderWidth: "1px",
      borderColor: "#1d4b26",
    },
    scrollContent: {
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <ImageBackground
      source={require("../../public/images/fondoApp.png")}
      style={styles.image}
      resizeMode="cover"
    >
      <KeyboardAwareScrollView style={{ marginTop: 60 }}>
        <View>
          <Text style={[styles.mainTilte, { marginBottom: 30, fontSize: 30 }]}>
            Find a FULBITO tournament
          </Text>
          <Text style={styles.tilte}>Choose a FULBITO</Text>
          <View>
            <TextInput
              style={styles.textInput}
              placeholder="Search..."
              value={searchText}
              onChangeText={handleSearch}
            />
          </View>
        </View>

        {filteredData ? (
          <View
            style={{
              backgroundColor: "#cef5bb",
              width: "90%",
              height: "auto",

              alignSelf: "center",
              borderRadius: 5,
              paddingTop: 10,
              paddingBottom: 10,
              borderColor: "#1d4b26",
              borderWidth: "1px",
            }}
          >
            {filteredData.map((game) => (
              <TouchableHighlight
                key={game.id}
                style={[
                  styles.resultItem,
                  selectedItemId &&
                    game.id === selectedItemId.id &&
                    styles.selectedItem,
                ]}
                onPress={() => handleSelectOption(game)}
                underlayColor="#61ec69"
              >
                <View style={{ flexDirection: "row", justifyContent: "left" }}>
                  <Text style={[styles.tilte, { textAlign: "left" }]}>
                    {game.name + " "}
                    <Text style={styles.checkBoxLeague}>
                      by {game.admin.userName}
                    </Text>
                  </Text>
                </View>
              </TouchableHighlight>
            ))}
          </View>
        ) : null}

        <View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.buttonCreate}
              onPress={() => handleJoinFulbito(selectedItemId, user)}
            >
              <Text style={styles.buttonText}>Join FULBITO</Text>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="soccer-field"
                  size={40}
                  color={"#baffc9"}
                />
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Text
              onPress={() => navigation.navigate("LoggedPage")}
              style={[styles.mainTilte, { marginTop: 70, marginBottom: 20 }]}
            >
              RETURN
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default SearchNewFulbito;
