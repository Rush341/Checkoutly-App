/* eslint-disable @typescript-eslint/no-explicit-any */
// src/viewmodels/HomeViewModel.tsx
import React, { createContext, useContext } from "react";
import { OnboardingViewModelProps } from "../models/OnboardingViewProps.js";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/MainStackNavigator";
import { useAuth0 } from "react-native-auth0";
import { logger } from "../utils/logger";

const OnboardingViewModelContext = createContext<OnboardingViewModelProps | undefined>(
    undefined
);

export const OnboardingViewModelProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const { authorize } = useAuth0();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const onLogin = async () => {
        try {
            const res = await authorize(
                {},
                {
                    customScheme: 'com.ecommerce.auth0',
                },
            );

            if (res?.accessToken) {
                logger.log('Login successful:', res);
                navigation.navigate("Home");
            }
        } catch (e) {
            logger.log(e);
        }
    }

    return (
        <OnboardingViewModelContext.Provider
            value={{
                onLogin
            }}
        >
            {children}
        </OnboardingViewModelContext.Provider>
    );
};

export const useOnboardingViewModel = () => {
    const context = useContext(OnboardingViewModelContext);
    if (!context) {
        throw new Error(
            "useOnboardingViewModel must be used within a SpalshViewModelProvider"
        );
    }
    return context;
};
