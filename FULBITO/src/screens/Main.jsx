import React, { useContext, useState } from "react";
import { UserContext } from "./../../context/UserContext";
import { FontContext } from "./../../App";
import { useNavigation } from "@react-navigation/native";
import signIn from "../../firebase/auth/signIn";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";


const Main = () => {
  const { user, setUser } = useContext(UserContext);
  const font = useContext(FontContext);
  const navigation = useNavigation();
  const [completeUser, setCompleteUser] = useState({
    email: "",
    password: "",
  });

  const handleChangeText = (name, value) => {
    setCompleteUser({ ...completeUser, [name]: value });
  };

  const logIn = async () => {
    if (completeUser.email === "" || completeUser.password === "") {
      return Alert.alert("All inputs must be completed");
    } else {
      try {
        const userData = await signIn(
          completeUser.email,
          completeUser.password
        );
        setUser(userData);
        navigation.navigate("LoggedPage");
      } catch (error) {
        console.log(error);
        Alert.alert("Error signing in");
      }
    }
  };

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
    },
    button: {
      borderRadius: 5,
      borderColor: "#1d4b26",
      borderWidth: 2,
      backgroundColor: "#a681ef",
      width: 80,
      height: 40,
      margin: 5,
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
      margin: 5,
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
      source={require("../../public/images/fut.png")} // Reemplaza 'ruta_de_tu_imagen.jpg' con la ruta de tu imagen
      style={styles.image} // Ajusta el ancho y alto según tus necesidades
      resizeMode="cover"
    >
      <Text style={[styles.tilte, { marginTop: 60 }]}>Email</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        placeholderTextColor={"#a9ada7"}
        onChangeText={(value) => handleChangeText("email", value)}
      />
      <Text style={styles.tilte}>Password</Text>
      <TextInput
        textContentType="password"
        secureTextEntry={true}
        style={styles.textInput}
        placeholder="Password"
        placeholderTextColor={"#a9ada7"}
        onChangeText={(value) => handleChangeText("password", value)}
      />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => logIn()}
          style={styles.button}
          color={"#2d503b"}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "column", justifyContent: "center" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPassword")}
          style={{ margin: 5 }}
        >
          <Text style={styles.forgotPass}>¿Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateAccount")}
          style={{ margin: 5 }}
        >
          <Text style={styles.tilte}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Main;
