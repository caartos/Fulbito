import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ButtonCreateNewFulbito = ({createNewFulbito, styles}) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.buttonCreate}
            onPress={() => createNewFulbito()}
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
  )
}

export default ButtonCreateNewFulbito