import React from "react";
import { Divider } from "@rneui/themed";
import { View, Text, ImageBackground, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { useFontStyle } from "../../hooks/useFontStyle";
import myFulbitoStyles from "./../../styles/myFulbitoStyles";
import ListPlayingFulbitos from "../../components/lists/ListPlayingFulbitos";
import ButtonReturn from "../../components/buttons/ButtonReturn";
import ListJoinRequestFulbitos from "../../components/lists/ListJoinRequestFulbitos";

const MyFulbitos = () => {
  const { user } = useSelector((state) => state.user);
  const styles = useFontStyle(myFulbitoStyles);

  const playingFulbitosPlaying = user.playingFulbitos
    ? user.playingFulbitos.filter((fulbito) => fulbito.status === "playing")
    : [];

  const playingFulbitosPending = user.playingFulbitos
    ? user.playingFulbitos.filter((fulbito) => fulbito.status === "pending")
    : [];

  const fulbitosRequest = user.fulbitosRequest ? user.fulbitosRequest : null;


  return (
    <ImageBackground
      source={require("../../public/images/fondoApp.png")}
      style={styles.image}
      resizeMode="cover"
    >
      <View style={{ flex: "0.9", marginTop: 60 }}>
        <Text style={[styles.mainTitle, { marginBottom: 40, fontSize: 30 }]}>
          My FULBITOS
        </Text>
        <View style={styles.listsContainer}>
          <ListPlayingFulbitos
            title={"Playing Fulbitos"}
            mapingFulbitos={playingFulbitosPlaying}
            styles={styles}
          />
        </View>
        <Divider style={styles.divider} />
        <View style={styles.joinandpendingContainer}>
          <Text style={[styles.title]}>JOIN REQUESTS</Text>
          <ListJoinRequestFulbitos
            user={user}
            fulbitosRequest={fulbitosRequest}
            styles={styles}
          />
        </View>
        <Divider style={styles.divider} />
        <View style={styles.joinandpendingContainer}>
          <ListPlayingFulbitos
            title={"Pending Fulbitos"}
            mapingFulbitos={playingFulbitosPending}
            styles={styles}
          />
        </View>
        <ButtonReturn direction={"LoggedPage"} styles={styles} />
      </View>
    </ImageBackground>
  );
};

export default MyFulbitos;
