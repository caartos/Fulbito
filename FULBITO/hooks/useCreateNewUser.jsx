import { useNavigation } from "@react-navigation/native";
import signUp from "../firebase/auth/signUp";
import { Alert } from "react-native";
import { useState } from "react";

export function useCreateNewUser({ completeUser }) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordMinLength = 6;

  const inputComplete = () => {
    if (
      completeUser.userName === "" ||
      completeUser.firstName === "" ||
      completeUser.lastName === "" ||
      completeUser.email === "" ||
      completeUser.password === ""
    ) {
      Alert.alert("Todos los campos deben completarse");
      return;
    }
  };

  const emailVerification = () => {
    if (!emailRegex.test(completeUser.email)) {
      Alert.alert("Dirección de correo electrónico inválida");
      return;
    }
  };

  const passwordVerification = () => {
    if (completeUser.password.length < passwordMinLength) {
      Alert.alert(
        `La contraseña debe tener al menos ${passwordMinLength} caracteres`
      );
      return;
    }
  };

  const createNewUser = async () => {
    setLoading(true);
    inputComplete();
    emailVerification();
    passwordVerification();
    try {
      signUp(
        completeUser.userName,
        completeUser.firstName,
        completeUser.lastName,
        completeUser.email.toLocaleLowerCase(),
        completeUser.password,
        navigation
      );
      navigation.navigate("Main");
    } catch (error) {
      console.error("Error al registrar al usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  return { createNewUser, loading };
}
