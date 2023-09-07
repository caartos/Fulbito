import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ButtonsAppFunctions = ({ functionField, styles }) => {
  const navigation = useNavigation();
  
  return (
    <>
      {functionField.map((field) => (
        <View
          style={{ justifyContent: "center", alignItems: "center" }}
          key={field.title}
        >
          <TouchableOpacity
            style={[styles.buttonCreate, { marginTop: 20 }]}
            onPress={() => navigation.navigate(field.navigate)}
          >
            <Text style={styles.buttonText}>{field.title}</Text>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {field.icon}
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </>
  );
};

export default ButtonsAppFunctions;
