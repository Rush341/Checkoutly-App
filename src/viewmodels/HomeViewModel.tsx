/* eslint-disable @typescript-eslint/no-explicit-any */
// src/viewmodels/HomeViewModel.tsx
import React, { createContext, useContext } from "react";
import { HomeViewModelProps } from "../models/HomeViewProps";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/MainStackNavigator";
import { useAuth0 } from "react-native-auth0";
import { logger } from "../utils/logger";

const HomeViewModelContext = createContext<HomeViewModelProps | undefined>(
    undefined
);

export const HomeViewModelProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { user, isLoading, clearSession } = useAuth0();

    const onLogout = async () => {
        try {
            clearSession();
            navigation.navigate("Onboarding");
        } catch (error) {
            logger.log("Logout failed", error);
        }
    };

    const onExplore = () => {
        navigation.navigate("ProductList");
    }

    return (
        <HomeViewModelContext.Provider
            value={{
                isLoading,
                user: {
                    email: user?.email || "",
                    emailVerified: user?.emailVerified || false,
                    name: user?.name || "",
                    nickname: user?.nickname || "",
                    picture: user?.picture || "",
                    sub: user?.sub || "",
                    updatedAt: user?.updatedAt || "",
                },
                onLogout,
                onExplore,
            }}
        >
            {children}
        </HomeViewModelContext.Provider>
    );
};

export const useHomeViewModel = () => {
    const context = useContext(HomeViewModelContext);
    if (!context) {
        throw new Error(
            "useHomeViewModel must be used within a SpalshViewModelProvider"
        );
    }
    return context;
};
