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
import Spinner from "react-native-loading-spinner-overlay";
import { useSelector } from "react-redux";

const LeaguePredictions = (selectedLeague) => {
  const { user } = useSelector((state) => state.user);
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
  const [winOrLose, setWinOrLose] = useState([]);
  const [points, setPoints] = useState(null);
  const [loading, setLoading] = useState(false);
  const [i, setI] = useState(1);

  selectedLeague = { ...selectedLeague.route.params };

  const handleItemPress = (value) => {
    setSelectedValue(value);
    setExpanded(false);
    //console.log(value);
  };

  const handleCheckboxChange = (checkboxName, partido, index) => {
    //console.log(partido);
    //console.log(rounds);
    const updatedPredictions = { ...predictions };
    const roundKey = selectedValue;
    //console.log("asdasd", updatedPredictions);
    const spacedLeague = selectedLeague.league;
    const leagueWithoutSpaces = spacedLeague.replace(/\s/g, "");
    //console.log("roundKey", roundKey);

    function arrayToObject(arr) {
      const obj = {};
      for (let i = 0; i < arr.length; i++) {
        obj[i] = arr[i];
      }
      return obj;
    }

    // Verificar si la liga seleccionada ya tiene predicciones
    if (!updatedPredictions[leagueWithoutSpaces]) {
      // console.log(
      //   "uppredhandlechangebox",
      //   updatedPredictions[leagueWithoutSpaces]
      // );
      updatedPredictions[leagueWithoutSpaces] = {};
    }

    // Verificar si la ronda seleccionada ya tiene predicciones
    if (!updatedPredictions[leagueWithoutSpaces][roundKey]) {
      let a = Array(fixture.length).fill("");
      //console.log(a);
      let aObj = arrayToObject(a);
      //console.log(aObj);

      updatedPredictions[leagueWithoutSpaces][roundKey] = aObj;
    }

    updatedPredictions[leagueWithoutSpaces][roundKey][index] = {
      local: partido.equipoLocal,
      visit: partido.equipoVisitante,
      prediction: checkboxName,
      round: selectedValue,
    };

    //console.log("updpreed", updatedPredictions);

    //predicciones que vienen despues de la ultima vez de apretar save
    setPredictions(updatedPredictions);

    const updatedItems = [...selectedItems];
    //console.log(updatedItems);
    updatedItems[index] = checkboxName;
    //console.log(updatedItems[index]);

    setSelectedItems(updatedItems);
    //console.log("selecIt", selectedItems);
  };

  const savePredictions = () => {
    saveFixturePredictions(predictions, user);
    navigation.navigate("Predictions");
  };

  useEffect(() => {
    const arr = [];
    const fetchData = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          setI(1);
        }, 1);

        const spacedLeague = selectedLeague.league;
        const leagueWithoutSpaces = spacedLeague.replace(/\s/g, "");

        const userPredictions =
          user?.predictions?.[leagueWithoutSpaces]?.[selectedValue] || [];
        //console.log(userPredictions);
        let array = [];
        let maxIndex = Math.max(...Object.keys(userPredictions));

        for (let i = 0; i <= maxIndex; i++) {
          array.push(userPredictions[i].prediction || "");
        }
        //console.log(array);
        if (user.predictions) {
          setPredictions(user.predictions);
          setSelectedItems(array);
          //console.log(selectedItems);
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
        //console.log(rounds.data.response);
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
          if (!startTime) {
            return 0; // O cualquier otro valor predeterminado que desees usar cuando startTime sea null
          }

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
        //console.log(firstFutureDate);
        //console.log(firstFutureDate)
        const millisecondsRemaining =
          calculateTimeRemaining(firstFutureDate) * 60000;
        //console.log(millisecondsRemaining);
        setTimeout(() => {
          setReset(!reset);
        }, millisecondsRemaining);

        let results = [];
        for (const key in userPredictions) {
          const match = userPredictions[key];
          //console.log(match);
          const localTeam = match.local;
          const visitTeam = match.visit;
          let matchPrediction = match.prediction;
          //console.log(matchPrediction);

          // Buscar el partido correspondiente en el array de objetos

          const correspondingMatch = fixtureOrdered.find((item) => {
            //console.log(item)
            if (item.fixture.status.short == "FT") {
              return (
                item.teams.home.name === localTeam &&
                item.teams.away.name === visitTeam
              );
            }
          });

          if (correspondingMatch) {
            const goalsHome = correspondingMatch.goals.home;
            const goalsAway = correspondingMatch.goals.away;

            // Comparar los goles y determinar el resultado
            let result;
            if (goalsHome > goalsAway) {
              result = "local";
            } else if (goalsHome < goalsAway) {
              result = "visit";
            } else {
              result = "draw";
            }

            // Comparar la predicción con el resultado real
            if (matchPrediction == result) {
              //console.log("WIN");
              results.push("WIN");
            } else {
              //console.log("LOSE");
              results.push("LOSE");
            }
          } else {
            //console.log("No prediction");
            results.push("No prediction");
          }
        }
        //console.log(results);

        setWinOrLose(results);
        const p = results.reduce((totalPoints, result) => {
          if (result === "WIN") {
            return totalPoints + 1; // Suma 1 al total de puntos por cada "WIN"
          }
          return totalPoints; // No suma nada si no es "WIN"
        }, 0);
        setPoints(p);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };
    fetchData();
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    setI(0);
  }, [selectedValue, selectedLeague.code, user]);

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
    homeVsAwayText: {
      color: "#1d4b26",
      fontFamily: font.fontFamily["bold"],
      fontSize: 20,
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
      opacity: 0.6, // Podes ajustar la opacidad según tus preferencias
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
    checkboxGreen: {
      color: "green",
    },
    checkboxRed: {
      color: "red",
    },
  });

  return (
    <ImageBackground
      source={require("../../public/images/fondoApp.png")}
      style={styles.image}
      resizeMode="cover"
    >
      {/* <Spinner
        visible={loading} // Mostrar el Spinner si loading es true
      /> */}
      {loading ? (
        <ScrollView style={{ marginTop: 60 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              left: 35,
              top: 130,
              zIndex: 1000,
            }}
          >
            <Spinner
              visible={loading}
              textContent={"Loading..."}
              textStyle={styles.spinnerTextStyle}
            />
          </View>
          <View>
            <Text
              style={[styles.mainTilte, { marginBottom: 30, fontSize: 30 }]}
            >
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
                opacity: 0.6,
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
                      <ListItem.Title>
                        {selectedValue || "Rounds"}
                      </ListItem.Title>
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
              <View>
                {points ? (
                  <Text style={styles.tilte}>Points: {points}</Text>
                ) : null}
              </View>
              <View style={{ flexDirection: "row", marginBottom: 5 }}>
                <Text style={[styles.homeVsAwayText, { width: "48%" }]}>
                  Home
                </Text>
                <Text style={styles.homeVsAwayText}>vs</Text>
                <Text style={[styles.homeVsAwayText, { width: "48%" }]}>
                  Away
                </Text>
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
                          checkedColor={
                            selectedItems[i] == "local" && winOrLose[i] == "WIN"
                              ? "#2de833" // Utilizamos el estilo checkboxGreen si acertó (GANASTE)
                              : selectedItems[i] === "local" &&
                                winOrLose[i] === "LOSE"
                              ? "#ff0101" // Utilizamos el estilo checkboxRed si falló (PERDISTE)
                              : "black" // En cualquier otro caso, dejamos el color predeterminado (negro)
                          }
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
                          onPress={() =>
                            handleCheckboxChange("draw", partido, i)
                          }
                          checkedColor={
                            selectedItems[i] == "draw" && winOrLose[i] == "WIN"
                              ? "#1dff4a" // Utilizamos el estilo checkboxGreen si acertó (GANASTE)
                              : selectedItems[i] === "draw" &&
                                winOrLose[i] === "LOSE"
                              ? "#ff0101" // Utilizamos el estilo checkboxRed si falló (PERDISTE)
                              : "black" // En cualquier otro caso, dejamos el color predeterminado (negro)
                          }
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
                          checkedColor={
                            selectedItems[i] == "visit" && winOrLose[i] == "WIN"
                              ? "#1dff4a" // Utilizamos el estilo checkboxGreen si acertó (GANASTE)
                              : selectedItems[i] === "visit" &&
                                winOrLose[i] === "LOSE"
                              ? "#ff0101" // Utilizamos el estilo checkboxRed si falló (PERDISTE)
                              : "black" // En cualquier otro caso, dejamos el color predeterminado (negro)
                          }
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
                  onPress={() => savePredictions()}
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
                  style={[
                    styles.mainTilte,
                    { marginTop: 70, marginBottom: 50 },
                  ]}
                >
                  RETURN
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={{ marginTop: 60 }}>
          <View>
            <Text
              style={[styles.mainTilte, { marginBottom: 30, fontSize: 30 }]}
            >
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
                      <ListItem.Title>
                        {selectedValue || "Rounds"}
                      </ListItem.Title>
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
              <View>
                {points ? (
                  <Text style={styles.tilte}>Points: {points}</Text>
                ) : null}
              </View>
              <View style={{ flexDirection: "row", marginBottom: 5 }}>
                <Text style={[styles.homeVsAwayText, { width: "48%" }]}>
                  Home
                </Text>
                <Text style={styles.homeVsAwayText}>vs</Text>
                <Text style={[styles.homeVsAwayText, { width: "48%" }]}>
                  Away
                </Text>
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
                          checkedColor={
                            selectedItems[i] == "local" && winOrLose[i] == "WIN"
                              ? "#2de833" // Utilizamos el estilo checkboxGreen si acertó (GANASTE)
                              : selectedItems[i] === "local" &&
                                winOrLose[i] === "LOSE"
                              ? "#ff0101" // Utilizamos el estilo checkboxRed si falló (PERDISTE)
                              : "black" // En cualquier otro caso, dejamos el color predeterminado (negro)
                          }
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
                          onPress={() =>
                            handleCheckboxChange("draw", partido, i)
                          }
                          checkedColor={
                            selectedItems[i] == "draw" && winOrLose[i] == "WIN"
                              ? "#1dff4a" // Utilizamos el estilo checkboxGreen si acertó (GANASTE)
                              : selectedItems[i] === "draw" &&
                                winOrLose[i] === "LOSE"
                              ? "#ff0101" // Utilizamos el estilo checkboxRed si falló (PERDISTE)
                              : "black" // En cualquier otro caso, dejamos el color predeterminado (negro)
                          }
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
                          checkedColor={
                            selectedItems[i] == "visit" && winOrLose[i] == "WIN"
                              ? "#1dff4a" // Utilizamos el estilo checkboxGreen si acertó (GANASTE)
                              : selectedItems[i] === "visit" &&
                                winOrLose[i] === "LOSE"
                              ? "#ff0101" // Utilizamos el estilo checkboxRed si falló (PERDISTE)
                              : "black" // En cualquier otro caso, dejamos el color predeterminado (negro)
                          }
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
                  onPress={() => savePredictions()}
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
                  style={[
                    styles.mainTilte,
                    { marginTop: 70, marginBottom: 50 },
                  ]}
                >
                  RETURN
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </ImageBackground>
  );
};

export default LeaguePredictions;
