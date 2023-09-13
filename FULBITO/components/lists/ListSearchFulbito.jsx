import React from "react";
import { Text, TouchableHighlight, View } from "react-native";

const ListSearchFulbito = ({
  filteredData,
  setSelectedItemId,
  selectedItemId,
  styles,
}) => {
  const handleSelectOption = (item) => {
    setSelectedItemId(item);
  };

  return (
    <View style={styles.listSearchFulbitoContainer}>
      {filteredData.map((game) => (
        <TouchableHighlight
          key={game.id}
          style={[
            styles.resultItem,
            selectedItemId &&
              game.id === selectedItemId.id &&
              styles.selectedItem,
          ]}
          onPress={() => handleSelectOption(game)}
          underlayColor="#61ec69"
        >
          <View style={{ flexDirection: "row", justifyContent: "left" }}>
            <Text style={[styles.title, { textAlign: "left" }]}>
              {game.name + " "}
              <Text style={styles.checkBoxLeague}>
                by {game.admin.userName}
              </Text>
            </Text>
          </View>
        </TouchableHighlight>
      ))}
    </View>
  );
};

export default ListSearchFulbito;
