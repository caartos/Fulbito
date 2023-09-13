import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ButtonPlayFulbito = ({ submitFunction, title, styles, customIcon }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity style={styles.buttonCreate} onPress={submitFunction}>
        <Text style={styles.buttonText}>{title}</Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {customIcon}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonPlayFulbito;
