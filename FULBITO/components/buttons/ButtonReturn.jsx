import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ButtonReturn = ({ direction, styles }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity>
      <Text
        style={styles.return}
        onPress={() => navigation.navigate(direction)}
      >
        RETURN
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonReturn;
