import React from "react";
import {
  StatusBar,
  View
} from 'react-native';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import colors from './src/styles/Colors';
import GlobalStyles from "./src/styles/GlobalStyles";
import { NavigationContainer } from "@react-navigation/native";
import { Auth0Provider } from "react-native-auth0";
import Toast from "react-native-toast-message";
import toastConfig from "./src/components/Toast";

const App = () => {

  return (
    <>
      <StatusBar backgroundColor={colors.black} barStyle="light-content" />
      <NavigationContainer>
        <View style={GlobalStyles.fullFlex}>
          <Auth0Provider domain={"dev-kd5v8tlytpw1nbtg.us.auth0.com"} clientId={"z4ZzDakwcONfyBNPPGuMRGJSZ6PO1GDh"}>
            <MainStackNavigator />
            <Toast config={toastConfig} />
          </Auth0Provider>
        </View>
      </NavigationContainer>
    </>
  );
};

export default App;
