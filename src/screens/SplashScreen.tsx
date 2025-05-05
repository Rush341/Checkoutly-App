
import React, { Fragment } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
} from "react-native";
import { horizontalScale, verticalScale } from "../utils/Dimensions";
import colors from "../styles/Colors";
import FontStyles from "../styles/Fontstyles";
import GlobalStyles from "../styles/GlobalStyles";

const SplashScreen: React.FC = () => {
  return (
    <Fragment>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/app-logo-icon.png")}
          style={styles.appIcon}
        />
        <Text style={[FontStyles.PoppinsMedium16, GlobalStyles.white]}>
          Shop Smarter with Checkoutly
        </Text>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  appIcon: {
    borderRadius: horizontalScale(100),
    height: verticalScale(200),
    marginBottom: verticalScale(20),
    width: horizontalScale(200),
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.primaryColor,
    flex: 1,
    justifyContent: "center",
  },
});

export default SplashScreen;