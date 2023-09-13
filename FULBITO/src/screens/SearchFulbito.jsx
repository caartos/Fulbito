import React, { useState } from "react";
import { View, ImageBackground } from "react-native";
import searchFulbitoStyles from "../../styles/searchFulbitoStyles";
import { useFontStyle } from "../../hooks/useFontStyle";
import ButtonReturn from "../../components/buttons/ButtonReturn";
import InputSearchFulbito from "../../components/inputs/InputSearchFulbito";
import ListSearchFulbito from "../../components/lists/ListSearchFulbito";
import ButtonPlayFulbito from "../../components/buttons/ButtonPlayFulbito";
import { useJoinFulbito } from "../../hooks/useJoinFulbito";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SearchNewFulbito = () => {
  const styles = useFontStyle(searchFulbitoStyles);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const { handleJoinFulbito } = useJoinFulbito({ selectedItemId });

  return (
    <ImageBackground
      source={require("../../public/images/fondoApp.png")}
      style={styles.image}
      resizeMode="cover"
    >
      <KeyboardAwareScrollView style={styles.scroller}>
        <InputSearchFulbito setFilteredData={setFilteredData} styles={styles} />
        {filteredData && (
          <ListSearchFulbito
            filteredData={filteredData}
            setSelectedItemId={setSelectedItemId}
            selectedItemId={selectedItemId}
            styles={styles}
          />
        )}
        <View>
          <ButtonPlayFulbito
            submitFunction={handleJoinFulbito}
            title={"Join FULBITO"}
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
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default SearchNewFulbito;
