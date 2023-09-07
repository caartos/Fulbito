import firebase from "firebase/compat/app";
import { setUser } from "../actions/userActions";
import { updateDoc } from "firebase/firestore";

const acceptJoinFulbito = async (user, pendingUser, dispatch) => {
    const db = firebase.firestore();

    try {
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
          playingFulbitos: userDoc.data().playingFulbitos.map((fulbito) =>
            fulbito.id === pendingUser.fulbitoId
              ? {
                  ...fulbito,
                  participants: [
                    ...fulbito.participants,
                    {
                      Id: pendingUser.userPendingId,
                      userName: pendingUser.userNamePending,
                    },
                  ],
                }
              : fulbito
          ),
          fulbitosRequest: userDoc
            .data()
            .fulbitosRequest.filter(
              (request) => request.fulbitoId !== pendingUser.fulbitoId
            ),
        });
      }

      const userPendingQuerySnapshot = await db
        .collection("users")
        .where(
          "id",
          "==",
          pendingUser.userPendingId,
          "playingFulbitos",
          "array-contains",
          { id: pendingUser.fulbitoId }
        )
        .get();
      if (!userPendingQuerySnapshot.empty) {
        const userPendingDoc = userPendingQuerySnapshot.docs[0];

        const userPendingRef = db.collection("users").doc(userPendingDoc.id);
        //console.log(userPendingDoc);
        await updateDoc(userPendingRef, {
          playingFulbitos: userPendingDoc
            .data()
            .playingFulbitos.map((fulbito) =>
              fulbito.id === pendingUser.fulbitoId
                ? {
                    ...fulbito,
                    participants: [
                      ...fulbito.participants,
                      {
                        Id: pendingUser.userPendingId,
                        userName: pendingUser.userNamePending,
                      },
                    ],
                    status: "playing",
                  }
                : fulbito
            ),
        });
      }

      const fulbitoQuerySnapshot = await db
        .collection("fulbitos")
        .where("id", "==", pendingUser.fulbitoId)
        .get();

      if (!fulbitoQuerySnapshot.empty) {
        const fulbitoDoc = fulbitoQuerySnapshot.docs[0];
        const fulbitoRef = db.collection("fulbitos").doc(fulbitoDoc.id);

        const existingParticipants = fulbitoDoc.data().participants || [];
        await updateDoc(fulbitoRef, {
          participants: [
            ...existingParticipants,
            {
              Id: pendingUser.userPendingId,
              userName: pendingUser.userNamePending,
            },
          ],
        });

        const filteredFulbitosRequest = user.fulbitosRequest.filter(
          (request) => request.fulbitoId !== user.fulbitoId
        );

        dispatch(
          setUser({ ...user, fulbitosRequest: filteredFulbitosRequest })
        );
        console.log("Fulbito accepted successfully");
      }
      // Realizar acciones adicionales al aceptar el fulbito
    } catch (error) {
      console.log("Error accepting Fulbito:", error);
    }
  };

  export default acceptJoinFulbito