import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ButtonSubmitUser = ({ title, onSubmit, styles }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        style={styles.button}
        onPress={onSubmit}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonSubmitUser;
