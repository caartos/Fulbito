import React from "react";
import { Text, TextInput } from "react-native";

const InputFulbitoName = ({ setFulbitoName, styles }) => {
  const handleFulbitoName = (value) => {
    setFulbitoName(value);
  };

  return (
    <>
      <Text style={styles.title}>FULBITO name</Text>
      <TextInput
        style={styles.textInput}
        placeholder="FulbitoName"
        placeholderTextColor={"#a9ada7"}
        onChangeText={(value) => handleFulbitoName(value)}
      />
    </>
  );
};

export default InputFulbitoName;
