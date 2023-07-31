import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./../../context/UserContext";
import { FontContext } from "../../App";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";
import { ListItem } from "@rneui/themed";
import saveFixturePredictions from "./../../firebase/saveFixturePredictions";
import axios from "axios";
import { API_KEY } from "@env";

const LeaguePredictions = (selectedLeague) => {
  const { user } = useContext(UserContext);
  const font = useContext(FontContext);
  const navigation = useNavigation();
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [fixture, setFixture] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [rounds, setRounds] = useState([]);
  const [predictions, setPredictions] = useState({});
  const [userPredictions, setUserPredictions] = useState([]);
  const [reset, setReset] = useState(true);
  const [selectedItems, setSelectedItems] = useState(
    Array(fixture.length).fill(null)
  );

  selectedLeague = { ...selectedLeague.route.params };

  const handleItemPress = (value) => {
    setSelectedValue(value);
    setExpanded(false);
    console.log(value);
  };

  const handleCheckboxChange = (checkboxName, partido, index) => {
    console.log(partido);
    console.log(rounds);
    const updatedPredictions = { ...predictions };
    const roundKey = selectedValue;
    console.log("asdasd", updatedPredictions);
    const spacedLeague = selectedLeague.league;
    const leagueWithoutSpaces = spacedLeague.replace(/\s/g, "");
    console.log("roundKey", roundKey);

    function arrayToObject(arr) {
      const obj = {};
      for (let i = 0; i < arr.length; i++) {
        obj[i] = arr[i];
      }
      return obj;
    }

    // Verificar si la liga seleccionada ya tiene predicciones
    if (!updatedPredictions[leagueWithoutSpaces]) {
      console.log(
        "uppredhandlechangebox",
        updatedPredictions[leagueWithoutSpaces]
      );
      updatedPredictions[leagueWithoutSpaces] = {};
    }

    // Verificar si la ronda seleccionada ya tiene predicciones
    if (!updatedPredictions[leagueWithoutSpaces][roundKey]) {
      let a = Array(fixture.length).fill("");
      console.log(a);
      let aObj = arrayToObject(a);
      console.log(aObj);

      updatedPredictions[leagueWithoutSpaces][roundKey] = aObj;
    }

    updatedPredictions[leagueWithoutSpaces][roundKey][index] = {
      local: partido.equipoLocal,
      visit: partido.equipoVisitante,
      prediction: checkboxName,
      round: selectedValue,
    };

    console.log("updpreed", updatedPredictions);

    //predicciones que vienen despues de la ultima vez de apretar save
    setPredictions(updatedPredictions);

    const updatedItems = [...selectedItems];
    console.log(updatedItems);
    updatedItems[index] = checkboxName;
    console.log(updatedItems[index]);

    setSelectedItems(updatedItems);
    console.log("selecIt", selectedItems);
  };

  const savePredictions = () => {
    saveFixturePredictions(predictions, user);
  };

  useEffect(() => {
    const arr = [];
    const fetchData = async () => {
      try {
        const spacedLeague = selectedLeague.league;
        const leagueWithoutSpaces = spacedLeague.replace(/\s/g, "");

        const userPredictions =
          user?.predictions?.[leagueWithoutSpaces]?.[selectedValue] || [];
        console.log(userPredictions);
        let array = [];
        let maxIndex = Math.max(...Object.keys(userPredictions));

        for (let i = 0; i <= maxIndex; i++) {
          array.push(userPredictions[i].prediction || "");
        }
        console.log(array);
        if (user.predictions) {
          setPredictions(user.predictions);
          setSelectedItems(array);
          console.log(selectedItems);
        }

        const rounds = await axios.get(
          "https://v3.football.api-sports.io/fixtures/rounds",
          {
            params: {
              league: selectedLeague.code,
              season: 2023,
            },
            headers: {
              "x-rapidapi-host": "v3.football.api-sports.io",
              "x-rapidapi-key": API_KEY,
            },
          }
        );
        console.log(rounds.data.response);
        setRounds(rounds.data.response);

        if (selectedValue === "") {
          return;
        }

        const response = await axios.get(
          "https://v3.football.api-sports.io/fixtures?",
          {
            params: {
              league: selectedLeague.code,
              season: 2023,
              round: `${selectedValue}`,
            },
            headers: {
              "x-rapidapi-host": "v3.football.api-sports.io",
              "x-rapidapi-key": API_KEY,
            },
          }
        );
        const res = response ? response.data : null;
        //console.log(res);
        const fixtureOrdered = response.data.response.sort(
          (a, b) => a.fixture.timestamp - b.fixture.timestamp
        );

        const fixture = fixtureOrdered.map((partido) => {
          const horaInicio = partido.fixture.date;
          //console.log(horaInicio)
          const equipoLocal = partido.teams.home.name;
          const equipoVisitante = partido.teams.away.name;

          function haPasado(fechaHora) {
            const fechaHoraActual = new Date();
            const fechaHoraMenos15Min = new Date(fechaHora - 900000); // Restar 15 minutos en milisegundos
            arr.push(fechaHoraMenos15Min);

            return fechaHoraMenos15Min <= fechaHoraActual;
          }

          const status = haPasado(new Date(horaInicio));
          return {
            horaInicio,
            equipoLocal,
            equipoVisitante,
            status,
          };
        });
        //console.log(arr)
        setFixture(fixture);

        const calculateTimeRemaining = (startTime) => {
          const horaInicioPartido = new Date(startTime).getTime();
          const horaActual = new Date().getTime();
          const tiempoRestanteEnMilisegundos = horaInicioPartido - horaActual;
          const tiempoRestanteEnMinutos =
            tiempoRestanteEnMilisegundos / (1000 * 60); // Convertir a minutos
          return tiempoRestanteEnMinutos;
        };

        const findFirstFutureDate = () => {
          const currentDate = new Date();
          for (const date of arr) {
            const differenceInMinutes = calculateTimeRemaining(
              date,
              currentDate
            );
            if (differenceInMinutes > 0) {
              return date;
            }
          }
          return null; // Si no se encuentra ninguna fecha, devolvemos null
        };

        //Buscar la primera fecha con diferencia mayor que 0
        const firstFutureDate = findFirstFutureDate();
        //console.log(firstFutureDate)
        const millisecondsRemaining =
          calculateTimeRemaining(firstFutureDate) * 60000;

        setTimeout(() => {
          setReset(!reset);
        }, millisecondsRemaining);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selectedValue, selectedLeague.code, user, reset]);

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
      paddingLeft: 9,
      color: "#1d4b26",
      fontFamily: font.fontFamily["regular"],
      fontSize: 18,
      textAlign: "center",
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
      alignSelf: "left",
      width: "auto",
    },
    selectedItem: {
      alignSelf: "center",
      width: "auto",
      backgroundColor: "#f5e464",
    },
    scrollContent: {
      justifyContent: "center",
      alignItems: "center",
    },
    picker: {
      height: 50,
      width: 220,
      alignSelf: "center",
    },
    disabledCheckBox: {
      opacity: 0.5, // Puedes ajustar la opacidad según tus preferencias
      maxWidth: "95%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 5,
    },
    enableCheckBox: {
      maxWidth: "95%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 5,
    },
  });

  return (
    <ImageBackground
      source={require("../../public/images/fondoApp.png")}
      style={styles.image}
      resizeMode="cover"
    >
      <ScrollView style={{ marginTop: 60 }}>
        <View>
          <Text style={[styles.mainTilte, { marginBottom: 30, fontSize: 30 }]}>
            {selectedLeague.league} - {selectedLeague.country}
          </Text>
          <View
            style={{
              backgroundColor: "#cef5bb",
              width: "95%",
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
            <View style={{ marginBottom: 10 }}>
              <Text
                style={[
                  styles.checkBoxLeague,
                  {
                    width: "100%",
                    textAlign: "center",
                    fontWeight: "bold",
                    marginBottom: 10,
                  },
                ]}
              >
                Rounds
              </Text>

              <ListItem.Accordion
                style={[styles.picker, { marginBottom: 10 }]}
                content={
                  <ListItem.Content>
                    <ListItem.Title>{selectedValue || "Rounds"}</ListItem.Title>
                  </ListItem.Content>
                }
                isExpanded={expanded}
                onPress={() => {
                  setExpanded(!expanded);
                }}
              >
                <View style={{ maxHeight: 300 }}>
                  <FlatList
                    style={{ marginBottom: 100 }}
                    nestedScrollEnabled={true}
                    data={rounds}
                    renderItem={({ item }) => (
                      <ListItem
                        key={item}
                        onPress={() => handleItemPress(item)}
                      >
                        <ListItem.Content>
                          <ListItem.Title>{item}</ListItem.Title>
                        </ListItem.Content>
                      </ListItem>
                    )}
                    keyExtractor={(item) => item}
                  />
                </View>
              </ListItem.Accordion>
            </View>
            <ScrollView>
              {selectedValue === "" ? null : (
                <View>
                  {fixture.map((partido, i) => (
                    <View
                      style={
                        partido.status
                          ? styles.disabledCheckBox
                          : styles.enableCheckBox
                      }
                      key={i}
                    >
                      <CheckBox
                        containerStyle={{ width: "2%" }}
                        style={{ alignSelf: "flex-start" }}
                        value={selectedCheckbox === "local"}
                        checked={selectedItems[i] === "local"}
                        onPress={() =>
                          handleCheckboxChange("local", partido, i)
                        }
                        checkedColor="black"
                        uncheckedColor="#1d4b26"
                        disabled={partido.status}
                      />
                      <Text
                        style={[
                          styles.checkBoxLeague,
                          { maxWidth: "37%", width: "37%" },
                        ]}
                      >
                        {partido.equipoLocal}
                      </Text>
                      <CheckBox
                        containerStyle={{ width: "2%" }}
                        style={{ alignSelf: "center" }}
                        value={selectedCheckbox === "draw"}
                        checked={selectedItems[i] === "draw"}
                        onPress={() => handleCheckboxChange("draw", partido, i)}
                        checkedColor="black"
                        uncheckedColor="#1d4b26"
                        disabled={partido.status}
                      />
                      <Text
                        style={[
                          styles.checkBoxLeague,
                          { maxWidth: "37%", width: "37%" },
                        ]}
                      >
                        {partido.equipoVisitante}
                      </Text>
                      <CheckBox
                        containerStyle={{ width: "2%" }}
                        style={{ alignSelf: "flex-end" }}
                        value={selectedCheckbox === "visit"}
                        checked={selectedItems[i] === "visit"}
                        onPress={() =>
                          handleCheckboxChange("visit", partido, i)
                        }
                        checkedColor="black"
                        uncheckedColor="#1d4b26"
                        disabled={partido.status}
                      />
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
          <View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity
                style={styles.buttonCreate}
                onPress={savePredictions}
              >
                <Text style={styles.buttonText}>SAVE</Text>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
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
                style={[styles.mainTilte, { marginTop: 70, marginBottom: 50 }]}
              >
                RETURN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default LeaguePredictions;
