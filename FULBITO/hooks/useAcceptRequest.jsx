import { useDispatch } from "react-redux";
import acceptJoinFulbito from "../firebase/acceptJoinFulbito";
import { setUser } from "../actions/userActions";

export function useAcceptRequest(refreshUserData, setLoading) {
  const dispatch = useDispatch();
  const handleAcceptRequest = async (user, pendingUser, index) => {
    setLoading(true);
    await acceptJoinFulbito(user, pendingUser, dispatch);
    const updatedFulbitosRequest = user.fulbitosRequest.filter(
      (item, i) => i !== index
    );
    dispatch(setUser({ ...user, fulbitosRequest: updatedFulbitosRequest }));
    refreshUserData();
    setLoading(false);
  };

  return { handleAcceptRequest };
}
