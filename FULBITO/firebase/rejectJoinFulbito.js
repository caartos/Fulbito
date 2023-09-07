import firebase from "firebase/compat/app";
import { setUser } from "../actions/userActions";
import { updateDoc } from "firebase/firestore";

const rejectJoinFulbito = async (user, pendingUser, dispatch) => {
    const db = firebase.firestore();
    try {
      const userPendingQuerySnapshot = await db
        .collection("users")
        .where(
          "id",
          "==",
          pendingUser.userPendingId,
          "playingFulbitos",
          "==",
          pendingUser.fulbitoId
        )
        .get();
      if (!userPendingQuerySnapshot.empty) {
        const userPendingDoc = userPendingQuerySnapshot.docs[0];
        const userPendingRef = db.collection("users").doc(userPendingDoc.id);
        await updateDoc(userPendingRef, {
          playingFulbitos: userPendingDoc
            .data()
            .playingFulbitos.filter(
              (fulbito) => fulbito.id !== pendingUser.fulbitoId
            ),
        });
        const filteredFulbitosRequest = user.fulbitosRequest.filter(
          (request) => request.fulbitoId !== user.fulbitoId
          );
        dispatch(
          setUser({ ...user, fulbitosRequest: filteredFulbitosRequest })
        );
      }

      const userQuerySnapshot = await db
        .collection("users")
        .where(
          "id",
          "==",
          user.id,
          "fulbitosRequest",
          "==",
          pendingUser.userPendingId
        )
        .get();
      if (!userQuerySnapshot.empty) {
        const userDoc = userQuerySnapshot.docs[0];
        const userRef = db.collection("users").doc(userDoc.id);
        await updateDoc(userRef, {
          fulbitosRequest: userDoc
            .data()
            .fulbitosRequest.filter(
              (request) => request.fulbitoId !== pendingUser.fulbitoId
            ),
        });

        const filteredFulbitosRequest = user.fulbitosRequest.filter(
          (request) => request.fulbitoId !== user.fulbitoId
        );
        dispatch(
          setUser({ ...user, fulbitosRequest: filteredFulbitosRequest })
        );
      }
    } catch (error) {
      console.log("Error accepting Fulbito:", error);
    }
  };

  export default rejectJoinFulbito