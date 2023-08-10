import React, { useContext, useState, useEffect } from "react";
import { FontContext } from "../../App";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Predictions = () => {
  const font = useContext(FontContext);
  const navigation = useNavigation();

  const leagues = [
    { league: "Premier League", country: "England", code: "39" },
    { league: "Serie A", country: "Italy", code: "135" },
    { league: "LaLiga", country: "Spain", code: "140" },
    { league: "Liga Profesional Argentina", country: "Argentina", code: "128" },
  ];

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
      alignSelf: "center",
      color: "#1d4b26",
      fontFamily: font.fontFamily["bold"],
      fontSize: 25,
      textAlign: "left",
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
      width: 150,
      alignSelf: "center",
    },
  });

  return (
    <ImageBackground
      source={require("../../public/images/fondoApp.png")}
      style={styles.image}
      resizeMode="cover"
    >
      <View style={{ marginTop: 60 }}>
        <View>
          <Text style={[styles.mainTilte, { marginBottom: 30, fontSize: 30 }]}>
            Predictions
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
                    marginBottom: 30,
                  },
                ]}
              >
                Select League
              </Text>

              {leagues.map((league) => (
                <View key={league.code}>
                  <TouchableOpacity>
                    <Text
                      onPress={() =>
                        navigation.navigate("LeaguePredictions", {
                          league: league.league,
                          country: league.country,
                          code: league.code,
                        })
                      }
                      style={[
                        styles.tilte,
                        { marginTop: 20, marginBottom: 20 },
                      ]}
                    >
                      {league.league} - {league.country}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
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
    </ImageBackground>
  );
};

export default Predictions;
