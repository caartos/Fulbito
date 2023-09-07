import React from "react";
import { Text, TextInput, View } from "react-native";

const FormUser = ({ title, setData, fieldConfig, styles }) => {
  const handleChangeText = (name, value) => {
    setData((completeUser) => ({
      ...completeUser,
      [name]: value,
    }));
  };

  return (
    <View>
      {title ? <Text style={styles.mainTitle}>{title}</Text> : null}
      <View style={styles.inputContainer}>
        {fieldConfig?.map((field) => (
          <View key={field.name}>
            <Text style={[styles.title]}>{field.label}</Text>
            <TextInput
              style={styles.textInput}
              placeholder={field.label}
              placeholderTextColor={"#a9ada7"}
              secureTextEntry={field.secureTextEntry}
              onChangeText={(value) => handleChangeText(field.name, value)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default FormUser;
