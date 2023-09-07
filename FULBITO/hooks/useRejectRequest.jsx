import { useDispatch } from "react-redux";
import rejectJoinFulbito from "../firebase/rejectJoinFulbito";
import { setUser } from "../actions/userActions";

export function useRejectRequest(refreshUserData, setLoading) {
  const dispatch = useDispatch();
  const handleRejectRequest = async (user, pendingUser, index) => {
    setLoading(true);
    await rejectJoinFulbito(user, pendingUser, dispatch);
    const updatedFulbitosRequest = user.fulbitosRequest.filter(
      (item, i) => i !== index
    );
    dispatch(setUser({ ...user, fulbitosRequest: updatedFulbitosRequest }));
    refreshUserData();
    setLoading(false);
  };

  return { handleRejectRequest };
}
