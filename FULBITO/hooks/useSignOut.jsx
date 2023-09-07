import { useNavigation } from "@react-navigation/native";
import logOut from "../firebase/auth/signout";

export function useSignOut() {
    const navigation = useNavigation();
    const signOut = () => {
      logOut(navigation);
    };
    return { signOut };
  }