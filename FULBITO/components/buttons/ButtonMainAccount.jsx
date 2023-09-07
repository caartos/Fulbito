import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";

const ButtonMainAccount = ({ title, navigate, styles }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(navigate)}
      style={{ margin: 5 }}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonMainAccount;
