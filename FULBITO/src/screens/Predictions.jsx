import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFontStyle } from "../../hooks/useFontStyle";
import predictionsStyles from "../../styles/predictionsStyles";
import LoadingSpinner from "../../components/spinner/Spinner";

const Predictions = () => {
  const styles = useFontStyle(predictionsStyles);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); // Desactiva el indicador de carga
  }, []); //

  const leagues = [
    { league: "Premier League", country: "England", code: "39" },
    { league: "Serie A", country: "Italy", code: "135" },
    { league: "LaLiga", country: "Spain", code: "140" },
    { league: "Liga Profesional Argentina", country: "Argentina", code: "128" },
  ];

  return (
    <ImageBackground
      source={require("../../public/images/fondoApp.png")}
      style={styles.image}
      resizeMode="cover"
    >
      <LoadingSpinner loading={loading} />
      <View style={{ marginTop: 60 }}>
        <View>
          <Text style={[styles.mainTitle, { marginBottom: 30, fontSize: 30 }]}>
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
                        styles.title,
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
              style={styles.return}
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
