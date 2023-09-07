import React from "react";
import { Text, TextInput, View } from "react-native";
import styles from "../../styles/forgotPasswordStyles";

const FormForgotPassword = () => {
  const handleChangeText = (value) => {
    setEmail(value);
  };

  return (
    <View>
      <Text style={[styles.title, { marginBottom: 40, fontSize: 30 }]}>
        RESET YOUR PASSWORD
      </Text>
      <Text style={[styles.title]}>Email</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        placeholderTextColor={"#a9ada7"}
        onChangeText={(value) => handleChangeText(value)}
      />
    </View>
  );
};

export default FormForgotPassword;
