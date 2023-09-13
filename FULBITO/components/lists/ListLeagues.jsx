import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import leagues from "../../config/leaguesSetup";
import { useNavigation } from "@react-navigation/native";

const ListLeagues = ({ styles }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.listLeagueContainer}>
      <Text style={styles.checkBoxLeague}>Select League</Text>
      {leagues?.map((league) => (
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
              style={styles.title}
            >
              {league.league} - {league.country}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default ListLeagues;
