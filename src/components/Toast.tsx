/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Toast from "react-native-toast-message";
import SuccessIcon from "../assets/icons/verified-icon.svg";
import ErrorIcon from "../assets/icons/error-icon.svg"; // You’ll need to import/create this
import FontStyles from "../styles/Fontstyles";
import colors from "../styles/Colors";
import { horizontalScale, verticalScale } from "../utils/Dimensions";
import GlobalStyles from "../styles/GlobalStyles";

export const showMessage = (
  message: string,
  type: "success" | "error" = "success"
) => {
  Toast.show({
    type,
    text1: message,
    visibilityTime: 3000,
    autoHide: true,
    position: "bottom",
    bottomOffset:
      Platform.OS === "android" ? verticalScale(110) : verticalScale(95),
  });
};

const BaseToast = ({ text1, type }: { text1: string; type: "success" | "error" }) => {
  const isError = type === "error";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isError ? colors.hexEF5353 : colors.hex006400 },
      ]}
    >
      <View style={styles.iconContainer}>
        {isError ? <ErrorIcon /> : <SuccessIcon />}
      </View>
      <Text
        style={[
          FontStyles.PoppinsMedium14,
          GlobalStyles.white,
          styles.textPadding,
        ]}
      >
        {text1}
      </Text>
    </View>
  );
};

const toastConfig = {
  success: (props: any) => <BaseToast {...props} type="success" />,
  error: (props: any) => <BaseToast {...props} type="error" />,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 8,
    elevation: 5,
    flexDirection: "row",
    marginTop: Platform.OS === "android" ? verticalScale(10) : verticalScale(20),
    padding: 10,
    shadowColor: colors.hex000000,
    shadowOffset: {
      width: horizontalScale(0),
      height: verticalScale(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: "90%",
  },
  iconContainer: {
    alignItems: "center",
    borderRadius: 12,
    height: 24,
    justifyContent: "center",
    marginRight: horizontalScale(13),
    width: 24,
  },
  textPadding: {
    flex: 1,
    flexWrap: "wrap",
  },
});

export default toastConfig;
