import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import firebase from "firebase/compat/app";
import { setUser } from "../actions/userActions";

export function useRefreshUserData({ user }) {
    const db = firebase.firestore();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const refreshUserData = async () => {
      try {
        const userDoc = await db
          .collection("users")
          .where("id", "==", user.id)
          .get();
        if (userDoc.docs[0]) {
          const userData = userDoc.docs[0].data();
          dispatch(setUser(userData));
        }
      } catch (error) {
        console.log("Error refreshing user data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (loading) {
        refreshUserData();
      }
    }, [loading]);
  
    return { refreshUserData };
  }