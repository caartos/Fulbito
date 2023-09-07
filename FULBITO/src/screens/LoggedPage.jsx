import React from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { useFontStyle } from "../../hooks/useFontStyle";
import loggedPageStyles from "../../styles/loggedPageStyles";
import ButtonsAppFunctions from "../../components/buttons/ButtonsAppFunctions";
import functionField from "../../config/loggedPaggeConfig";
import ButtonLogOut from "../../components/buttons/ButtonLogOut";

const LoggedPage = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user)
  const styles = useFontStyle(loggedPageStyles);

  return (
    <ImageBackground
      source={require("../../public/images/fondoApp.png")}
      style={styles.image}
      resizeMode="cover"
    >
      <ScrollView>
        <Text style={styles.mainTitle}>Hi {user?.userName}!</Text>
        <View style={{ flex: "0.9", justifyContent: "center" }}>
          <ButtonsAppFunctions functionField={functionField} styles={styles} />
          <ButtonLogOut styles={styles} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default LoggedPage;
