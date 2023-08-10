import React, { useContext, useState } from "react";
import { FontContext } from "../../App";
import signUp from "../../firebase/auth/signUp";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const CreateAccount = () => {
  const [completeUser, setCompleteUser] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const font = useContext(FontContext);
  const navigation = useNavigation();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordMinLength = 6;

  const handleChangeText = (name, value) => {
    setCompleteUser({ ...completeUser, [name]: value });
  };

  const createNewUser = () => {
    if (
      completeUser.userName === "" ||
      completeUser.firstName === "" ||
      completeUser.lastName === "" ||
      completeUser.email === "" ||
      completeUser.password === ""
    ) {
      return Alert.alert("All inputs must be completed");
    }
    if (!emailRegex.test(completeUser.email)) {
      return Alert.alert("Invalid email address");
    }

    if (completeUser.password.length < passwordMinLength) {
      return Alert.alert(
        `Password must have at least ${passwordMinLength} characters`
      );
    }
    signUp(
      completeUser.userName,
      completeUser.firstName,
      completeUser.lastName,
      completeUser.email.toLocaleLowerCase(),
      completeUser.password,
      navigation
    );
  };

  const styles = StyleSheet.create({
    image: {
      width: "100%",
      height: "100%",
    },
    mainTilte: {
      fontFamily: font.fontFamily["bold"],
      fontSize: 22,
      textAlign: "center",
      color: "#1d4b26",
      margin: 20,
    },
    tilte: {
      fontFamily: font.fontFamily["bold"],
      fontSize: 22,
      textAlign: "center",
      color: "#1d4b26",
      margin: 2,
    },
    button: {
      borderRadius: 5,
      borderColor: "#1d4b26",
      borderWidth: 2,
      backgroundColor: "#a681ef",
      width: 150,
      height: 40,
      marginTop: 60,
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
  });
  return (
    <ImageBackground
      source={require("../../public/images/fondoApp.png")} // Reemplaza 'ruta_de_tu_imagen.jpg' con la ruta de tu imagen
      style={styles.image} // Ajusta el ancho y alto según tus necesidades
      resizeMode="cover"
    >
      <KeyboardAwareScrollView style={{ flex: "0.9", marginTop: 60 }}>
        <Text style={[styles.mainTilte, { marginBottom: 30, fontSize: 30 }]}>
          CREATE ACCOUNT
        </Text>
        <View
          style={{
            justifyContent: "center",
            backgroundColor: "#cef5bb",
            width: "80%",
            height: "auto",
            alignSelf: "center",
            borderRadius: 5,
            paddingTop: 10,
            paddingBottom: 10,
            borderColor: "#1d4b26",
            borderWidth: "1px",
          }}
        >
          <Text style={[styles.tilte]}>Username</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            placeholderTextColor={"#a9ada7"}
            onChangeText={(value) => handleChangeText("userName", value)}
          />
          <Text style={[styles.tilte]}>First Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="First Name"
            placeholderTextColor={"#a9ada7"}
            onChangeText={(value) => handleChangeText("firstName", value)}
          />
          <Text style={[styles.tilte]}>Last Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Last Name"
            placeholderTextColor={"#a9ada7"}
            onChangeText={(value) => handleChangeText("lastName", value)}
          />
          <Text style={[styles.tilte]}>Email</Text>
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
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              createNewUser();
            }}
          >
            <Text style={styles.buttonText}>Create User</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text
            style={styles.mainTilte}
            onPress={() => navigation.navigate("Main")}
          >
            RETURN
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default CreateAccount;
