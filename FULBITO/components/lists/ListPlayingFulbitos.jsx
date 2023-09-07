import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ListPlayingFulbitos = ({ title, mapingFulbitos, styles }) => {
  const navigation = useNavigation();
  return (
    <>
      <Text style={[styles.title]}>{title}</Text>
      {mapingFulbitos.length > 0
        ? mapingFulbitos.map((fulbito, i) => (
            <TouchableOpacity
              key={fulbito.id}
              onPress={() => navigation.navigate("Fulbito", fulbito)}
            >
              <View style={{ flexDirection: "row", justifyContent: "left" }}>
                <Text
                  style={[
                    styles.checkBoxLeague,
                    { width: "100%", textAlign: "left" },
                  ]}
                >
                  <Text style={{ fontWeight: "bold" }}>{i + 1}.</Text>{" "}
                  {fulbito.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        : null}
    </>
  );
};

export default ListPlayingFulbitos;
