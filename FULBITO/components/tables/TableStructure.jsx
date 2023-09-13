import React from "react";
import { Text, View } from "react-native";

const TableStructure = ({styles}) => {
  return (
    <View>
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
    </View>
  );
};

export default TableStructure;
