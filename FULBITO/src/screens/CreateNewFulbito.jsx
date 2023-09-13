import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, ImageBackground } from "react-native";
import ButtonReturn from "../../components/buttons/ButtonReturn";
import createNewFulbitoStyles from "./../../styles/createNewFulbitoStyles";
import { useFontStyle } from "../../hooks/useFontStyle";
import { useCreateNewFulbito } from "../../hooks/useCreateNewFulbito";
import CheckboxLeagues from "../../components/checkbox/CheckboxLeagues";
import ButtonPlayFulbito from "../../components/buttons/ButtonPlayFulbito";
import InputFulbitoName from "../../components/inputs/InputFulbitoName";
import LoadingSpinner from "../../components/spinner/Spinner";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CreateNewFulbito = () => {
  const styles = useFontStyle(createNewFulbitoStyles);
  const [selectedItems, setSelectedItems] = useState([]);
  const [fulbitoName, setFulbitoName] = useState("");
  const { createNewFulbito, loading } = useCreateNewFulbito({
    fulbitoName,
    selectedItems,
  });

  return (
    <ImageBackground
      source={require("../../public/images/fondoApp.png")}
      style={styles.image}
      resizeMode="cover"
    >
      <LoadingSpinner visible={loading} />
      <KeyboardAwareScrollView style={{ flex: "0.9", marginTop: 20 }}>
        <Text style={styles.mainTitle}>NEW FULBITO</Text>
        <InputFulbitoName setFulbitoName={setFulbitoName} styles={styles} />
        <CheckboxLeagues
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          styles={styles}
        />
        <ButtonPlayFulbito
          submitFunction={createNewFulbito}
          title={"create FULBITO"}
          styles={styles}
          customIcon={
            <MaterialCommunityIcons
              name="soccer-field"
              size={40}
              color={"#baffc9"}
            />
          }
        />
        <ButtonReturn direction={"LoggedPage"} styles={styles} />
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default CreateNewFulbito;
