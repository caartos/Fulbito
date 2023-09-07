import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, ImageBackground } from "react-native";
import ButtonReturn from "../../components/buttons/ButtonReturn";
import createNewFulbitoStyles from "./../../styles/createNewFulbitoStyles";
import { useFontStyle } from "../../hooks/useFontStyle";
import { useCreateNewFulbito } from "../../hooks/useCreateNewFulbito";
import CheckboxLeagues from "../../components/checkbox/CheckboxLeagues";
import ButtonCreateNewFulbito from "../../components/buttons/ButtonCreateNewFulbito";
import InputFulbitoName from "../../components/inputs/InputFulbitoName";
import LoadingSpinner from "../../components/spinner/Spinner";

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
        <ButtonCreateNewFulbito
          createNewFulbito={createNewFulbito}
          styles={styles}
        />
        <ButtonReturn direction={"LoggedPage"} styles={styles} />
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default CreateNewFulbito;
