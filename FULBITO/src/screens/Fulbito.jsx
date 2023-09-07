import React, { useState, useEffect } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Divider } from "@rneui/themed";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import fulbitoTable from "./../../firebase/fulbitoTable";
import Spinner from "react-native-loading-spinner-overlay";
import { useSelector } from "react-redux";
import fulbitoStyles from "../../styles/fulbitoStyles";
import { useFontStyle } from "../../hooks/useFontStyle";

const Fulbito = (fulbito) => {
  fulbito = fulbito.route.params;
  //  console.log(fulbito);
  const styles = useFontStyle(fulbitoStyles);
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const navigation = useNavigation();
  const [actFulbito, setActFulbito] = useState({});
  const [loading, setLoading] = useState(false);

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: "Compartir en WhatsApp",
        message: `
        Join fulbito: ${fulbito.name}
Create your predictions and win.
Good luck.`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fulbitoActual = await fulbitoTable(fulbito, user);
        //  console.log(fulbitoActual);
        setActFulbito(fulbitoActual);
        //  console.log(actFulbito);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };
    fetchData();
    //  console.log(actFulbito);
  }, []);
  //console.log(actFulbito);
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
  //console.log(actFulbito);

  return (
    <ImageBackground
      source={require("../../public/images/fondoApp.png")} // Reemplaza 'ruta_de_tu_imagen.jpg' con la ruta de tu imagen
      style={styles.image} // Ajusta el ancho y alto según tus necesidades
      resizeMode="cover"
    >
      {/* <Spinner
        visible={loading} // Mostrar el Spinner si loading es true
      /> */}
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Spinner
            visible={loading}
            textContent={"Loading..."}
            textStyle={styles.spinnerTextStyle}
          />
        </View>
      ) : (
        <ScrollView style={{ flex: "0.9" }}>
          <View style={{ marginTop: 60 }}>
            <Text
              style={[styles.mainTitle, { marginBottom: 40, fontSize: 30 }]}
            >
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
              <Text style={styles.title}>Score Table</Text>

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
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <TouchableOpacity
                    style={styles.buttonCreate}
                    onPress={() => onShare()}
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
                style={styles.return}
                onPress={() => navigation.navigate("LoggedPage")}
              >
                RETURN
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </ImageBackground>
  );
};

export default Fulbito;
