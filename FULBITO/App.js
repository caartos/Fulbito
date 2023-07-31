import React, { useEffect, useState, createContext } from "react";
import { View } from "react-native";
import AppNavigator from "./AppNavigator";
import * as Font from "expo-font";
import { UserProvider } from "./context/UserContext";

export const FontContext = createContext();

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        KalamRegular: require("./assets/fonts/Kalam-Regular.ttf"),
        KalamBold: require("./assets/fonts/Kalam-Bold.ttf"),
        KalamLight: require("./assets/fonts/Kalam-Light.ttf"),
      });

      setIsFontLoaded(true);
    };

    loadFonts();
  }, []);

  if (!isFontLoaded) {
    return null; // Mostrar una pantalla de carga mientras se carga la fuente
  }

  return (
    <UserProvider>
      <FontContext.Provider
        value={{
          fontFamily: {
            regular: "KalamRegular",
            bold: "KalamBold",
            light: "KalamLight",
          },
        }}
      >
        <View style={{ flex: 1 }}>
          <AppNavigator />
        </View>
      </FontContext.Provider>
    </UserProvider>
  );
}
