import React from "react";
import { ScrollView, Text, View } from "react-native";
import { CheckBox } from "react-native-elements";

const ListRoundGames = ({
  selectedValue,
  selectedItems,
  handleCheckboxChange,
  winOrLose,
  fixture,
  styles,
}) => {

  return (
    <ScrollView>
      {selectedValue === "" ? null : (
        <View>
          {fixture.map((partido, i) => (
            <View
              style={
                partido.status ? styles.disabledCheckBox : styles.enableCheckBox
              }
              key={i}
            >
              <CheckBox
                containerStyle={{ width: "2%" }}
                style={{ alignSelf: "flex-start" }}
                checked={selectedItems[i] === "local"}
                onPress={() => handleCheckboxChange("local", partido, i)}
                checkedColor={
                  selectedItems[i] == "local" && winOrLose[i] == "WIN"
                    ? "#2de833"
                    : selectedItems[i] === "local" && winOrLose[i] === "LOSE"
                    ? "#ff0101"
                    : "black"
                }
                uncheckedColor="#1d4b26"
                disabled={partido.status}
              />
              <Text
                style={[
                  styles.checkBoxLeague,
                  { maxWidth: "37%", width: "37%" },
                ]}
              >
                {partido.equipoLocal}
              </Text>
              <CheckBox
                containerStyle={{ width: "2%" }}
                style={{ alignSelf: "center" }}
                checked={selectedItems[i] === "draw"}
                onPress={() => handleCheckboxChange("draw", partido, i)}
                checkedColor={
                  selectedItems[i] == "draw" && winOrLose[i] == "WIN"
                    ? "#1dff4a"
                    : selectedItems[i] === "draw" && winOrLose[i] === "LOSE"
                    ? "#ff0101"
                    : "black"
                }
                uncheckedColor="#1d4b26"
                disabled={partido.status}
              />
              <Text
                style={[
                  styles.checkBoxLeague,
                  { maxWidth: "37%", width: "37%" },
                ]}
              >
                {partido.equipoVisitante}
              </Text>
              <CheckBox
                containerStyle={{ width: "2%" }}
                style={{ alignSelf: "flex-end" }}
                checked={selectedItems[i] === "visit"}
                onPress={() => handleCheckboxChange("visit", partido, i)}
                checkedColor={
                  selectedItems[i] == "visit" && winOrLose[i] == "WIN"
                    ? "#1dff4a"
                    : selectedItems[i] === "visit" && winOrLose[i] === "LOSE"
                    ? "#ff0101"
                    : "black"
                }
                uncheckedColor="#1d4b26"
                disabled={partido.status}
              />
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default ListRoundGames;
