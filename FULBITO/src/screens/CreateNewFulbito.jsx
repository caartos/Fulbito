import React, { useState, useEffect } from "react";
import { CheckBox } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import createFulbito from "./../../firebase/createFulbito";
import Spinner from "react-native-loading-spinner-overlay";
import { useSelector } from "react-redux";
import ButtonReturn from "../../components/buttons/ButtonReturn";
import createNewFulbitoStyles from './../../styles/createNewFulbitoStyles'
import { useFontStyle } from "../../hooks/useFontStyle";

const CreateNewFulbito = () => {
  const { user } = useSelector((state) => state.user);
  const styles = useFontStyle(createNewFulbitoStyles);
  const navigation = useNavigation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [fulbitoName, setFulbitoName] = useState("");
  const [loading, setLoading] = useState(false);
  const [i, setI] = useState(0);

  const handleCheckboxChange = (value) => {
    const updatedItems = [...selectedItems];
    //console.log(updatedItems)
    if (updatedItems.includes(value)) {
      //console.log(value)
      const index = updatedItems.indexOf(value);
      updatedItems.splice(index, 1);
    } else {
      updatedItems.push(value);
    }
    setSelectedItems(updatedItems);
  };

  const handleFulbitoName = (value) => {
    const newFul = setFulbitoName(value);
  };

  const handleCreateFulbito = async () => {
    setLoading(true);
    const createdFulbitoId = await createFulbito(
      fulbitoName,
      selectedItems,
      user,
      navigation
    );
    setLoading(false);
  };

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setI(1);
      }, 1);
    }
  }, [loading]);

  
  return (
    <ImageBackground
      source={require("../../public/images/fondoApp.png")} // Reemplaza 'ruta_de_tu_imagen.jpg' con la ruta de tu imagen
      style={styles.image} // Ajusta el ancho y alto según tus necesidades
      resizeMode="cover"
    >
      {/* <Spinner
        visible={loading} // Mostrar el Spinner si loading es true
      /> */}
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Spinner
            visible={loading}
            textContent={"Loading..."}
            textStyle={styles.spinnerTextStyle}
          />
        </View>
      ) : (
        <KeyboardAwareScrollView style={{ flex: "0.9", marginTop: 20 }}>
          <Text
            style={[
              styles.mainTitle,
              { marginTop: 60, marginBottom: 40, fontSize: 30 },
            ]}
          >
            NEW FULBITO
          </Text>
          <Text style={[styles.title]}>FULBITO name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="FulbitoName"
            placeholderTextColor={"#a9ada7"}
            onChangeText={(value) => handleFulbitoName(value)}
          />

          <View style={styles.container}>
            <View
              style={{
                backgroundColor: "#cef5bb",
                width: "80%",
                height: "auto",
                justifyContent: "center",
                alignSelf: "center",
                borderRadius: 5,
                paddingTop: 10,
                paddingBottom: 10,
                borderColor: "#1d4b26",
                borderWidth: "1px",
              }}
            >
              <Text style={[styles.title]}>Choose your Leagues</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "center",
                }}
              >
                <Text
                  style={[
                    styles.checkBoxLeague,
                    { width: "70%", textAlign: "left" },
                  ]}
                >
                  Premier League
                </Text>
                <CheckBox
                  style={{ width: "30%" }}
                  checked={selectedItems.includes("PremierLeague")}
                  onPress={() => handleCheckboxChange("PremierLeague")}
                  checkedColor="#1d4b26"
                  uncheckedColor="#1d4b26"
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "center",
                }}
              >
                <Text
                  style={[
                    styles.checkBoxLeague,
                    { width: "70%", textAlign: "left" },
                  ]}
                >
                  LaLiga
                </Text>
                <CheckBox
                  style={{ width: "30%" }}
                  checked={selectedItems.includes("LaLiga")}
                  onPress={() => handleCheckboxChange("LaLiga")}
                  checkedColor="#1d4b26"
                  uncheckedColor="#1d4b26"
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "center",
                }}
              >
                <Text
                  style={[
                    styles.checkBoxLeague,
                    { width: "70%", textAlign: "left" },
                  ]}
                >
                  Serie A
                </Text>
                <CheckBox
                  style={{ width: "30%" }}
                  checked={selectedItems.includes("SerieA")}
                  onPress={() => handleCheckboxChange("SerieA")}
                  checkedColor="#1d4b26"
                  uncheckedColor="#1d4b26"
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "center",
                }}
              >
                <Text
                  style={[
                    styles.checkBoxLeague,
                    { width: "70%", textAlign: "left" },
                  ]}
                >
                  Liga Profesional Argentina
                </Text>
                <CheckBox
                  style={{ width: "30%" }}
                  checked={selectedItems.includes("LigaProfesionalArgentina")}
                  onPress={() =>
                    handleCheckboxChange("LigaProfesionalArgentina")
                  }
                  checkedColor="#1d4b26"
                  uncheckedColor="#1d4b26"
                />
              </View>
            </View>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.buttonCreate}
              onPress={() => handleCreateFulbito()}
            >
              <Text style={styles.buttonText}>Create FULBITO</Text>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="soccer-field"
                  size={40}
                  color={"#baffc9"}
                />
              </View>
            </TouchableOpacity>
          </View>
          <ButtonReturn direction={"LoggedPage"} styles={styles} />
        </KeyboardAwareScrollView>
      )}
    </ImageBackground>
  );
};

export default CreateNewFulbito;
