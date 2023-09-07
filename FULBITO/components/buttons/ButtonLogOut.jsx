import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSignOut } from "../../hooks/useSignOut";

const ButtonLogOut = ({ styles }) => {
  const { signOut } = useSignOut();

  return (
    <View style={{ justifyContent: "flex-end", alignItems: "center" }}>
      <TouchableOpacity style={styles.buttonLogOut}>
        <Text style={styles.logOutText} onPress={() => signOut()}>
          LOG OUT
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonLogOut;
