import React, { useContext, useState } from "react";
import { UserContext } from "./../../context/UserContext";
import { FontContext } from "../../App";
import { CheckBox } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import createFulbito from "./../../firebase/createFulbito";

const CreateNewFulbito = () => {
  const { user, setUser } = useContext(UserContext);

  const font = useContext(FontContext);
  const navigation = useNavigation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [fulbitoName, setFulbitoName] = useState("");

  const handleCheckboxChange = (value) => {
    const updatedItems = [...selectedItems];
    console.log(updatedItems)
    if (updatedItems.includes(value)) {
      console.log(value)
      const index = updatedItems.indexOf(value);
      updatedItems.splice(index, 1);
    } else {
      updatedItems.push(value);
    }
    setSelectedItems(updatedItems);
  };

  const handleFulbitoName = (value) => {
    const newFul = setFulbitoName(value);
  };

  const handleCreateFulbito = async () => {
    const createdFulbitoId = await createFulbito(
      fulbitoName,
      selectedItems,
      user,
      navigation
    );
   
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
      marginBottom: 20,
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
  });
  return (
    <ImageBackground
      source={require("../../public/images/fondoApp.png")} // Reemplaza 'ruta_de_tu_imagen.jpg' con la ruta de tu imagen
      style={styles.image} // Ajusta el ancho y alto según tus necesidades
      resizeMode="cover"
    >
      <KeyboardAwareScrollView style={{ flex: "0.9",  marginTop: 20 }}>
        <Text style={[styles.mainTilte, { marginTop: 60, marginBottom: 40, fontSize: 30 }]}>
          NEW FULBITO
        </Text>
        <Text style={[styles.tilte]}>FULBITO name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="FulbitoName"
          placeholderTextColor={"#a9ada7"}
          onChangeText={(value) => handleFulbitoName(value)}
        />

        <View style={styles.container}>
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
            <Text style={[styles.tilte]}>Choose your Leagues</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <Text
                style={[
                  styles.checkBoxLeague,
                  { width: "70%", textAlign: "left" },
                ]}
              >
                Premier League
              </Text>
              <CheckBox
                style={{ width: "30%" }}
                checked={selectedItems.includes("PremierLeague")}
                onPress={() => handleCheckboxChange("PremierLeague")}
                checkedColor="#1d4b26"
                uncheckedColor="#1d4b26"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <Text
                style={[
                  styles.checkBoxLeague,
                  { width: "70%", textAlign: "left" },
                ]}
              >
                LaLiga
              </Text>
              <CheckBox
                style={{ width: "30%" }}
                checked={selectedItems.includes("LaLiga")}
                onPress={() => handleCheckboxChange("LaLiga")}
                checkedColor="#1d4b26"
                uncheckedColor="#1d4b26"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <Text
                style={[
                  styles.checkBoxLeague,
                  { width: "70%", textAlign: "left" },
                ]}
              >
                Serie A
              </Text>
              <CheckBox
                style={{ width: "30%" }}
                checked={selectedItems.includes("SerieA")}
                onPress={() => handleCheckboxChange("SerieA")}
                checkedColor="#1d4b26"
                uncheckedColor="#1d4b26"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <Text
                style={[
                  styles.checkBoxLeague,
                  { width: "70%", textAlign: "left" },
                ]}
              >
                Liga Profesional Argentina
              </Text>
              <CheckBox
                style={{ width: "30%" }}
                checked={selectedItems.includes("LigaProfesionalArgentina")}
                onPress={() => handleCheckboxChange("LigaProfesionalArgentina")}
                checkedColor="#1d4b26"
                uncheckedColor="#1d4b26"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <Text
                style={[
                  styles.checkBoxLeague,
                  { width: "70%", textAlign: "left" },
                ]}
              >
                Liga Profesional Brasil
              </Text>
              <CheckBox
                style={{ width: "30%" }}
                checked={selectedItems.includes("SeriaA")}
                onPress={() => handleCheckboxChange("SerieA")}
                checkedColor="#1d4b26"
                uncheckedColor="#1d4b26"
              />
            </View>
          </View>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.buttonCreate}
            onPress={() => handleCreateFulbito()}
          >
            <Text style={styles.buttonText}>Create FULBITO</Text>
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
            style={[styles.mainTilte, { marginTop: 70 }]}
            onPress={() => navigation.navigate("LoggedPage")}
          >
            RETURN
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default CreateNewFulbito;
