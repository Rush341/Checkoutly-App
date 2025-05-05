import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import { OnboardingViewModelProvider } from "../viewmodels/OnboardingViewModel";
import HomeScreen from "../screens/HomeScreen";
import { HomeViewModelProvider } from "../viewmodels/HomeViewModel";
import ProductListScreen from "../screens/ProductListScreen";
import { ProductListViewModelProvider } from "../viewmodels/ProductListViewModel";
import FilterScreen from "../screens/FilterScreen";
import { FilterViewModelProvider } from "../viewmodels/FilterViewModel";
import { Filter } from "../models/FilterViewProps";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import { Product } from "../models/ProductListViewProps";
import SplashViewModelProvider from "../viewmodels/SplashViewModel";

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Home: undefined;
  ProductList: undefined;
  Filter: {
    onApplyFilter: (filter: Filter) => void,
    onClearFilter: () => void,
    filter: Filter
  };
  ProductDetails: {
    product: Product
  }
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      id={undefined}
      screenOptions={{ gestureEnabled: false, headerShown: false }}
    >
      {/* Splash, Welcome, and Auth screens */}
      <Stack.Screen name="Splash">
        {() => (
          <SplashViewModelProvider>
            <SplashScreen />
          </SplashViewModelProvider>
        )}
      </Stack.Screen>

      <Stack.Screen
        name="Onboarding"
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        {() => (
          <OnboardingViewModelProvider>
            <OnboardingScreen />
          </OnboardingViewModelProvider>
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        {() => (
          <HomeViewModelProvider>
            <HomeScreen />
          </HomeViewModelProvider>
        )}
      </Stack.Screen>
      <Stack.Screen
        name="ProductList"
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        {() => (
          <ProductListViewModelProvider>
            <ProductListScreen />
          </ProductListViewModelProvider>
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Filter"
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        {() => (
          <FilterViewModelProvider>
            <FilterScreen />
          </FilterViewModelProvider>
        )}
      </Stack.Screen>
      <Stack.Screen
        name="ProductDetails"
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        {() => (
          <ProductDetailsScreen />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
