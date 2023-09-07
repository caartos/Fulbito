import React from "react";
import { Text, View } from "react-native";
import { CheckBox } from "react-native-elements";
import leaguesFields from "../../config/leaguesFulbitoConfig";

const CheckboxLeagues = ({ selectedItems, setSelectedItems, styles }) => {
  const handleCheckboxChange = (value) => {
    const updatedItems = [...selectedItems];
    if (updatedItems.includes(value)) {
      const index = updatedItems.indexOf(value);
      updatedItems.splice(index, 1);
    } else {
      updatedItems.push(value);
    }
    setSelectedItems(updatedItems);
  };

  return (
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
        {leaguesFields.map((league) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "center",
            }}
            key={league.name}
          >
            <Text
              style={[
                styles.checkBoxLeague,
                { width: "70%", textAlign: "left" },
              ]}
            >
              {league.name}
            </Text>
            <CheckBox
              style={{ width: "30%" }}
              checked={selectedItems.includes(league.item)}
              onPress={() => handleCheckboxChange(league.item)}
              checkedColor="#1d4b26"
              uncheckedColor="#1d4b26"
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default CheckboxLeagues;
