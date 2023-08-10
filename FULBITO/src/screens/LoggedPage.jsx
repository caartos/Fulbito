import React, { useContext } from "react";
import { UserContext } from "./../../context/UserContext";
import { FontContext } from "../../App";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import logOut from "../../firebase/auth/signout";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoggedPage = () => {
  const { user } = useContext(UserContext);
  const font = useContext(FontContext);
  const navigation = useNavigation();

  const signOut = () => {
    logOut(navigation);
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
    buttonLogOut: {
      borderRadius: 5,
      borderColor: "#1d4b26",
      borderWidth: 2,
      backgroundColor: "#f5e464",
      width: 170,
      height: 40,
      marginTop: 70,
      marginBottom: 20,
    },
    logOutText: {
      color: "#1d4b26",
      fontFamily: font.fontFamily["bold"],
      fontSize: 17,
      textAlign: "center",
      padding: 8,
    },
    buttonText: {
      color: "#baffc9",
      fontFamily: font.fontFamily["bold"],
      fontSize: 17,
      textAlign: "center",
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
  });
  return (
    <ImageBackground
      source={require("../../public/images/fondoApp.png")} // Reemplaza 'ruta_de_tu_imagen.jpg' con la ruta de tu imagen
      style={styles.image} // Ajusta el ancho y alto según tus necesidades
      resizeMode="cover"
    >
      <ScrollView>
        <Text style={[styles.mainTilte, { marginTop: 70, fontSize: 30 }]}>
          Hi {user != null ? user.userName : null}!
        </Text>
        <View style={{ flex: "0.9", justifyContent: "center" }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={[styles.buttonCreate, { marginTop: 20 }]}
              onPress={() => navigation.navigate("CreateNewFulbito")}
            >
              <Text style={styles.buttonText}>Create New FULBITO</Text>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <IoniconsIcon name="ios-football" size={40} color={"#baffc9"} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.buttonCreate}
              onPress={() => navigation.navigate("SearchFulbito")}
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
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.buttonCreate}
              onPress={() => navigation.navigate("MyFulbitos")}
            >
              <Text style={styles.buttonText}>My FULBITOS</Text>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <FontAwesome5 name="trophy" size={40} color={"#baffc9"} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.buttonCreate}
              onPress={() => navigation.navigate("Predictions")}
            >
              <Text style={styles.buttonText}>My Predictions</Text>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <IoniconsIcon name="ios-football" size={40} color={"#baffc9"} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.buttonCreate}
              onPress={() => Alert.alert("Proximamente las rules")}
            >
              <Text style={styles.buttonText}>FULBITO Rules</Text>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="file-document-edit"
                  size={40}
                  color={"#baffc9"}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "flex-end", alignItems: "center" }}>
            <TouchableOpacity style={styles.buttonLogOut}>
              <Text style={styles.logOutText} onPress={() => signOut()}>
                LOG OUT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default LoggedPage;
