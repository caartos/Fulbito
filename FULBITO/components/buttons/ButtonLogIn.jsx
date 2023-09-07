import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const ButtonLogIn = ({ styles }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity>
      <Text style={styles.title} onPress={() => navigation.navigate("Main")}>
        LOG IN
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonLogIn;
