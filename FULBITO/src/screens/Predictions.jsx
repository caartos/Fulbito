import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { useFontStyle } from "../../hooks/useFontStyle";
import predictionsStyles from "../../styles/predictionsStyles";
import ButtonReturn from "../../components/buttons/ButtonReturn";
import ListLeagues from "../../components/lists/ListLeagues";

const Predictions = () => {
  const styles = useFontStyle(predictionsStyles);

  return (
    <ImageBackground
      source={require("../../public/images/fondoApp.png")}
      style={styles.image}
      resizeMode="cover"
    >
      <View style={styles.predictionsContainer}>
        <View>
          <Text style={styles.mainTitle}>
            Predictions
          </Text>
          <View style={styles.leaguesContainer}>
            <ListLeagues styles={styles} />
          </View>
          <ButtonReturn direction={"LoggedPage"} styles={styles} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Predictions;
