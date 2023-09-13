import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
} from "react-native";
import fulbitoStyles from "../../styles/fulbitoStyles";
import { useFontStyle } from "../../hooks/useFontStyle";
import LoadingSpinner from "../../components/spinner/Spinner";
import { useInviteFriends } from "../../hooks/useInviteFriends";
import { useGetTable } from "../../hooks/useGetTable";
import ListParticipants from "../../components/lists/ListParticipants";
import TableStructure from "../../components/tables/TableStructure";
import ButtonPlayFulbito from "../../components/buttons/ButtonPlayFulbito";
import ButtonReturn from "../../components/buttons/ButtonReturn";

const Fulbito = (fulbito) => {
  fulbito = fulbito.route.params;
  const styles = useFontStyle(fulbitoStyles);
  const { onShare } = useInviteFriends({ fulbitoName: fulbito.name });
  const { actFulbito, loading } = useGetTable({ fulbito });

  return (
    <ImageBackground
      source={require("../../public/images/fondoApp.png")}
      style={styles.image}
      resizeMode="cover"
    >
      <LoadingSpinner loading={loading} />
      <ScrollView style={{ flex: "0.9" }}>
        <View style={{ marginTop: 60 }}>
          <Text style={styles.mainTitle}>{fulbito.name}</Text>
          <View style={styles.tableContainer}>
            <TableStructure styles={styles} />
            {actFulbito.participants && (
              <ListParticipants actFulbito={actFulbito} styles={styles} />
            )}
            <ButtonPlayFulbito
              submitFunction={onShare}
              title={"Invite Friends"}
              styles={styles}
              customIcon={
                <AntDesign name="adduser" size={40} color={"#baffc9"} />
              }
            />
          </View>
          <ButtonReturn direction={"MyFulbitos"} styles={styles} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Fulbito;
