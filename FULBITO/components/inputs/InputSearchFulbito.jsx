import React from "react";
import { Text, TextInput, View } from "react-native";
import { useSearchFulbito } from "../../hooks/useSearchFulbito";

const InputSearchFulbito = ({ setFilteredData, styles }) => {
  const { handleSearch, searchText } = useSearchFulbito({ setFilteredData });
  return (
    <View>
      <Text style={styles.mainTitle}>
        Find a FULBITO tournament
      </Text>
      <Text style={styles.title}>Choose a FULBITO</Text>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
    </View>
  );
};

export default InputSearchFulbito;
