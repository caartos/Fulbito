import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./../../context/UserContext";
import { FontContext } from "../../App";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Divider } from "@rneui/themed";
import * as Linking from 'expo-linking';
import { ListItem } from "@rneui/themed";
import axios from "axios";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import fulbitoTable from "./../../firebase/fulbitoTable";

const Fulbito = (fulbito) => {
  fulbito = fulbito.route.params;
  console.log(fulbito);
  const font = useContext(FontContext);
  const { user } = useContext(UserContext);
  console.log(user);
  const navigation = useNavigation();
  const [expanded, setExpanded] = React.useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [puntajes, setPuntajes] = useState([]);
  const [actFulbito, setActFulbito] = useState({});


  const shareFulbitoViaWhatsApp = async() => {
    try {
      const phoneNumber = "+34667887637"; // Número de teléfono del destinatario
      const message = "¡Hola! ¿Te gustaría unirte a nuestro fulbito?"; // Mensaje a enviar

      // Crear el enlace con el número de teléfono y el mensaje
      const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

      // Abrir la aplicación de WhatsApp
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("No se pudo abrir WhatsApp");
      }
    } catch (error) {
      console.log("Error al enviar el mensaje de WhatsApp:", error);
    }
    Alert.alert("Invitation sent")
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fulbitoActual = await fulbitoTable(fulbito, user);
        console.log(fulbitoActual);
        setActFulbito(fulbitoActual);
        console.log(actFulbito);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    console.log(actFulbito);
  }, []);
  console.log(actFulbito);
  // const obtenerPuntajes = async () => {
  //   try {
  //     // Realizar la solicitud HTTP para obtener los puntajes desde la API
  //     const response = await axios.get(
  //       'https://ruta-de-tu-api/obtener-puntajes'
  //     );

  //     // Actualizar el estado con los datos obtenidos
  //     setPuntajes(response.data);
  //   } catch (error) {
  //     console.error('Error al obtener los puntajes:', error);
  //   }
  // };
  console.log(actFulbito);

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
      marginBottom: 20,
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
    dividerPlayerPoints: {
      color: "#1d4b26",
      height: "100%",
      borderWidth: "1px",
    },
    divider: {
      color: "#1d4b26",
      width: "90%",
      borderWidth: "1px",
      alignSelf: "center",
    },
    picker: {
      borderColor: "#1d4b26",
      borderWidth: "1px",
      height: 50,
      width: 200,
      alignSelf: "center",
    },
  });
  return (
    <ImageBackground
      source={require("../../public/images/fondoApp.png")} // Reemplaza 'ruta_de_tu_imagen.jpg' con la ruta de tu imagen
      style={styles.image} // Ajusta el ancho y alto según tus necesidades
      resizeMode="cover"
    >
      <View style={{ flex: "0.9" }}>
        <View style={{ marginTop: 60 }}>
          <Text style={[styles.mainTilte, { marginBottom: 40, fontSize: 30 }]}>
            {fulbito.name}
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
            <Text style={[styles.tilte]}>Score Table</Text>

            <View style={{ flexDirection: "row", justifyContent: "left" }}>
              <Text
                style={[
                  styles.checkBoxLeague,
                  { width: "70%", textAlign: "center", fontWeight: "bold" },
                ]}
              >
                Players
              </Text>
              <Text
                style={[
                  styles.checkBoxLeague,
                  { width: "30%", textAlign: "center", fontWeight: "bold" },
                ]}
              >
                Points
              </Text>
            </View>
            {actFulbito.participants &&
              actFulbito.participants.map((player, i) => (
                <View key={player.Id}>
                  <View
                    style={{ flexDirection: "row", justifyContent: "left" }}
                  >
                    <Text
                      style={[
                        styles.checkBoxLeague,
                        { width: "70%", textAlign: "left" },
                      ]}
                    >
                      <Text style={{ fontWeight: "bold" }}>{i + 1}.</Text>{" "}
                      {player.userName}
                    </Text>
                    <Divider
                      orientation="vertical"
                      style={styles.dividerPlayerPoints}
                    />
                    <Text
                      style={[
                        styles.checkBoxLeague,
                        { width: "30%", textAlign: "center" },
                      ]}
                    >
                      {player.points}
                    </Text>
                  </View>
                  <Divider orientation="horizontal" style={styles.divider} />
                </View>
              ))}
            <View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.buttonCreate}
                  onPress={() => shareFulbitoViaWhatsApp}
                >
                  <Text style={styles.buttonText}>Invite Friends</Text>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <AntDesign name="adduser" size={40} color={"#baffc9"} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity>
            <Text
              style={[styles.mainTilte, { marginTop: 70, marginBottom: 50 }]}
              onPress={() => navigation.navigate("LoggedPage")}
            >
              RETURN
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Fulbito;
