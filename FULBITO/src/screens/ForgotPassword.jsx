import React, { useContext, useState } from "react";
import { FontContext } from "../../App";
import resetPassword from "../../firebase/auth/resetPassword";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import { useNavigation } from '@react-navigation/native';

const ForgotPassword = () => {
  const font = useContext(FontContext);
  const navigation = useNavigation()
  const [email, setEmail] = useState("")
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChangeText = (value) => {
    console.log(value);
    setEmail(value);
    
  };

  const newPassword = () => {
    if(email ===""){
      return Alert.alert("Introduce email")
    }
    if (!emailRegex.test(email)) {
      return Alert.alert("Invalid email address");
    }
    resetPassword(email)
  }
  const styles = StyleSheet.create({
    image: {
      width: "100%",
      height: "100%",
    },
    tilte: {
      fontFamily: font.fontFamily["bold"],
      fontSize: 22,
      textAlign: "center",
      color: "#1d4b26",
      margin: 10,
    },
    button: {
      borderRadius: 5,
      borderColor: "#1d4b26",
      borderWidth: 2,
      backgroundColor: "#a681ef",
      width: 190,
      height: 40,
      margin: 10,
    },
    buttonText: {
      color: "#baffc9",
      fontFamily: font.fontFamily["bold"],
      fontSize: 17,
      textAlign: "center",
      padding: 8,
    },
    textInput: {
      height: 40,
      margin: 10,
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      width: 200,
      alignSelf: "center",
      borderColor: "#1d4b26",
      borderWidth: 2,
    },
    forgotPass: {
      fontFamily: font.fontFamily["regular"],
      textAlign: "center",
      color: "#1d4b26",
    },
  });
  return (
    <ImageBackground
      source={require("../../public/images/fondoApp.png")} // Reemplaza 'ruta_de_tu_imagen.jpg' con la ruta de tu imagen
      style={styles.image} // Ajusta el ancho y alto según tus necesidades
      resizeMode="cover"
    >
      <View style={{ flex: "0.9", justifyContent: "center" }}>
        <Text style={[styles.tilte, { marginBottom: 40, fontSize: 30 }]}>
          RESET YOUR PASSWORD
        </Text>
        <Text style={[styles.tilte]}>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor={"#a9ada7"}
            onChangeText={(value) => handleChangeText(value)}
          />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity style={styles.button} onPress={()=>newPassword()}>
            <Text  style={styles.buttonText}>Send new password</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={styles.tilte} onPress={() => navigation.navigate('Main')}>LOG IN</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default ForgotPassword;
