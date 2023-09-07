import React, { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from "react-native";
import searchFulbito from "../../firebase/searchFulbito";
import { useNavigation } from "@react-navigation/native";
import { updateDoc, arrayUnion } from "firebase/firestore";
import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";
import searchFulbitoStyles from "../../styles/searchFulbitoStyles";
import { useFontStyle } from "../../hooks/useFontStyle";

const SearchNewFulbito = () => {
  const { user } = useSelector((state) => state.user);
  const styles = useFontStyle(searchFulbitoStyles);
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const db = firebase.firestore();

  const handleSearch = (text) => {
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

 

  return (
    <ImageBackground
      source={require("../../public/images/fondoApp.png")}
      style={styles.image}
      resizeMode="cover"
    >
      <KeyboardAwareScrollView style={{ marginTop: 60 }}>
        <View>
          <Text style={[styles.mainTitle, { marginBottom: 30, fontSize: 30 }]}>
            Find a FULBITO tournament
          </Text>
          <Text style={styles.title}>Choose a FULBITO</Text>
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
                  <Text style={[styles.title, { textAlign: "left" }]}>
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
              style={styles.return}
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
