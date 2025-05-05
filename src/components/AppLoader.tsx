import React from "react";
import { View, Modal, StyleSheet, ActivityIndicator } from "react-native";
import colors from "../styles/Colors";

interface AppLoaderProps {
  visible: boolean;
}

const AppLoader: React.FC<AppLoaderProps> = ({ visible }) => {
  if (!visible) return null; // Don't render if not visible

  return (
    <Modal transparent={false} animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
  },
});

export default AppLoader;
