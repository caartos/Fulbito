import { Alert } from "react-native";
import resetPassword from "../firebase/auth/resetPassword";

export function useGetNewPassword( {email} ) {
  console.log(email)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const newPassword = () => {
    if (email === "") {
      return Alert.alert("Introduce email");
    }
    if (!emailRegex.test(email)) {
      return Alert.alert("Invalid email address");
    }
    resetPassword(email);
  };

  return { newPassword };
}
