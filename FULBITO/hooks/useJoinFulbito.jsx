import { useNavigation } from "@react-navigation/native";
import joinFulbito from "../firebase/joinFulbito";
import { useSelector } from "react-redux";

export function useJoinFulbito({ selectedItemId }) {
  const { user } = useSelector((state) => state.user);
  const navigation = useNavigation();
  const handleJoinFulbito = async () => {
    const alertShown = await joinFulbito(selectedItemId, user);
    if (alertShown) {
      navigation.navigate("LoggedPage");
    }
  };
  return { handleJoinFulbito };
}
