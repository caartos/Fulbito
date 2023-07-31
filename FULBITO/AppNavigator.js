import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./src/screens/Main";
import ForgotPassword from "./src/screens/ForgotPassword";
import CreateAccount from "./src/screens/CreateAccount";
import LoggedPage from "./src/screens/LoggedPage";
import CreateNewFulbito from "./src/screens/CreateNewFulbito";
import Fulbito from "./src/screens/Fulbito";
import SearchFulbito from "./src/screens/SearchFulbito";
import MyFulbitos from "./src/screens/MyFulbitos";
import LeaguePredictions from "./src/screens/LeaguePredictions";
import Predictions from "./src/screens/Predictions";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoggedPage"
          component={LoggedPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateNewFulbito"
          component={CreateNewFulbito}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Fulbito"
          component={Fulbito}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchFulbito"
          component={SearchFulbito}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyFulbitos"
          component={MyFulbitos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LeaguePredictions"
          component={LeaguePredictions}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Predictions"
          component={Predictions}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
