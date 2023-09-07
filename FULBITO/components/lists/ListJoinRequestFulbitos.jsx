import React, { useState } from "react";
import { useRefreshUserData } from "../../hooks/useRefreshUserData";
import { useAcceptRequest } from "../../hooks/useAcceptRequest";
import { useRejectRequest } from "../../hooks/useRejectRequest";
import Entypo from "react-native-vector-icons/Entypo";
import { Text, TouchableOpacity, View } from "react-native";
import LoadingSpinner from "../spinner/Spinner";

const ListJoinRequestFulbitos = ({ user, fulbitosRequest, styles }) => {
  const [loading, setLoading] = useState(false);
  const { refreshUserData } = useRefreshUserData({ user });
  const { handleAcceptRequest } = useAcceptRequest(refreshUserData, setLoading);
  const { handleRejectRequest } = useRejectRequest(refreshUserData, setLoading);

  return (
    <>
      <LoadingSpinner loading={loading} />
      {fulbitosRequest
        ? fulbitosRequest.map((request, i) => (
            <View
              key={i}
              style={{
                maxWidth: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "60%", alignSelf: "left" }}>
                <Text style={[styles.checkTitle]}>
                  <Text style={styles.checkBoxLeague}>Join</Text>
                  {" " + request.userNamePending + " "}
                  <Text style={styles.checkBoxLeague}>to</Text>
                  {" " + request.fulbitoName}?
                </Text>
              </View>
              <View
                style={{
                  width: "40%",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    handleAcceptRequest(user, user.fulbitosRequest[i], i)
                  }
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Entypo name="check" size={40} color={"#baffc9"} />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { marginLeft: 10, marginRight: 10 }]}
                  onPress={() =>
                    handleRejectRequest(user, user.fulbitosRequest[i], i)
                  }
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Entypo name="cross" size={40} color={"#baffc9"} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))
        : null}
    </>
  );
};

export default ListJoinRequestFulbitos;
