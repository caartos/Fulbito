import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, ImageBackground, ScrollView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import saveFixturePredictions from "./../../firebase/saveFixturePredictions";
import { useFontStyle } from "../../hooks/useFontStyle";
import useGetSelectedRound from "../../hooks/useGetSelectedRound";
import useMakePredictions from "../../hooks/useMakePredictions";
import leaguePredionsStyles from "../../styles/leaguePredictionsStyles";
import LoadingSpinner from "../../components/spinner/Spinner";
import ButtonReturn from "../../components/buttons/ButtonReturn";
import ButtonPlayFulbito from "../../components/buttons/ButtonPlayFulbito";
import ListRounds from "../../components/lists/ListRounds";
import ListRoundGames from "../../components/lists/ListRoundGames";
import TablePredictionsStructure from "../../components/tables/TablePredictionsStructure";

const LeaguePredictions = (selectedLeague) => {
  selectedLeague = { ...selectedLeague.route.params };
  const { user } = useSelector((state) => state.user);
  const styles = useFontStyle(leaguePredionsStyles);
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState("");
  const [predictions, setPredictions] = useState({});
  const {
    winOrLose,
    loading,
    points,
    fixture,
    rounds,
    selectedItems,
    setSelectedItems,
  } = useGetSelectedRound({
    selectedValue,
    selectedLeague,
    user,
    setPredictions,
  });
  const { handleCheckboxChange } = useMakePredictions({
    predictions,
    selectedValue,
    selectedLeague,
    selectedItems,
    setSelectedItems,
    setPredictions,
    fixture,
  });

  const savePredictions = () => {
    saveFixturePredictions(predictions, user);
    navigation.navigate("Predictions");
  };

  return (
    <ImageBackground
      source={require("../../public/images/fondoApp.png")}
      style={styles.image}
      resizeMode="cover"
    >
      <ScrollView style={{ marginTop: 60 }}>
        {loading && (
          <View style={styles.loadingScrollView}>
            <LoadingSpinner loading={loading} />
          </View>
        )}
        <View>
          <Text style={[styles.mainTitle, { marginBottom: 30, fontSize: 30 }]}>
            {selectedLeague.league} - {selectedLeague.country}
          </Text>
          <View style={styles.roundPredictionContainerLoading}>
            <ListRounds
              rounds={rounds}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              styles={styles}
            />
            <TablePredictionsStructure points={points} styles={styles} />
            <ListRoundGames
              selectedValue={selectedLeague}
              selectedItems={selectedItems}
              handleCheckboxChange={handleCheckboxChange}
              winOrLose={winOrLose}
              fixture={fixture}
              styles={styles}
            />
          </View>
          <ButtonPlayFulbito
            submitFunction={savePredictions}
            title={"SAVE"}
            styles={styles}
            customIcon={
              <MaterialCommunityIcons
                name="soccer-field"
                size={40}
                color={"#baffc9"}
              />
            }
          />
          <ButtonReturn direction={"Predictions"} styles={styles} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default LeaguePredictions;
