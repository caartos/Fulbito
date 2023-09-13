import React from "react";
import { Text, View } from "react-native";

const TablePredictionsStructure = ({points, styles}) => {
  return (
    <View>
      <View>
        {points ? <Text style={styles.title}>Points: {points}</Text> : null}
      </View>
      <View style={{ flexDirection: "row", marginBottom: 5 }}>
        <Text style={[styles.homeVsAwayText, { width: "48%" }]}>Home</Text>
        <Text style={styles.homeVsAwayText}>vs</Text>
        <Text style={[styles.homeVsAwayText, { width: "48%" }]}>Away</Text>
      </View>
    </View>
  );
};

export default TablePredictionsStructure;
