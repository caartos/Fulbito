import React from "react";
import { Text, View } from "react-native";
import { Divider } from "react-native-elements";    

const ListParticipants = ({ actFulbito,styles }) => {
    const orderActFulbitoParticipants = actFulbito.participants.sort((a, b) => b.points - a.points);
  return (
    <>
      {orderActFulbitoParticipants.map((player, i) => (
        <View key={player.Id}>
          <View style={{ flexDirection: "row", justifyContent: "left" }}>
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
    </>
  );
};

export default ListParticipants;
