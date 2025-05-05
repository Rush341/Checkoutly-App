// src/viewmodels/HomeViewModel.tsx
import React, { useEffect } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/MainStackNavigator";
import { useAuth0 } from "react-native-auth0";
import { logger } from "../utils/logger";

const SplashViewModelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user, isLoading } = useAuth0();

  useEffect(() => {
    if (isLoading) return;

    if (user) {
      logger.log("Logged in user:", user);
      setTimeout(() => {
        navigation.navigate("Home");
      }, 3000);
    } else {
      logger.log("User is null. Not logged in.");
      setTimeout(() => {
        navigation.navigate("Onboarding");
      }, 3000);
    }
  }, [user, isLoading]);

  return <>{children}</>;
};

export default SplashViewModelProvider;
