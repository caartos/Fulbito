import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ButtonMainLogIn = ({ logIn, styles }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        onPress={() => logIn()}
        style={styles.button}
        color={"#2d503b"}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonMainLogIn;
