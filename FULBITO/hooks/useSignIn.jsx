import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import signIn from "../firebase/auth/signIn";
import { setUser } from "../actions/userActions";
import { useState } from "react";

export function useSingIn(completeUser) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const logIn = async () => {
    if (completeUser.email === "" || completeUser.password === "") {
      return Alert.alert("All inputs must be completed");
    }
    try {
      setLoading(true);
      const userData = await signIn(completeUser.email, completeUser.password);
      dispatch(setUser(userData));
      setLoading(false);
      navigation.navigate("LoggedPage");
    } catch (error) {
      console.log(error);
      setLoading(false);
      Alert.alert("Error signing in");
    }
  };
  return { logIn, loading };
}
