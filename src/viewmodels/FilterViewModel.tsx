/* eslint-disable @typescript-eslint/no-explicit-any */
// src/viewmodels/FilterViewModel.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { Filter, FilterViewModelProps } from "../models/FilterViewProps";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/MainStackNavigator";

const FilterViewModelContext = createContext<FilterViewModelProps | undefined>(
    undefined
);
type ProductListRouteProps = RouteProp<RootStackParamList, 'Filter'>;

export const FilterViewModelProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<ProductListRouteProps>();
    const [filters, setFilters] = useState<Filter>({
        title: '',
        minPrice: '',
        maxPrice: '',
        categorySlug: ''
    });

    useEffect(() => {
        if (route.params?.filter) {
            setFilters(route.params.filter);
        }
    }, [route.params?.filter]);

   const handleChange = (key: string, value: string) => {
    if (key === 'minPrice' || key === 'maxPrice') {
        // Allow only numbers and a single dot
        const sanitizedValue = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        setFilters(prev => ({ ...prev, [key]: sanitizedValue }));
    } else {
        setFilters(prev => ({ ...prev, [key]: value }));
    }
};

    const handleApply = () => {
        route.params?.onApplyFilter(filters);
        navigation.goBack();
    };

    const handleClear = () => {
        setFilters({
            title: '',
            minPrice: '',
            maxPrice: '',
            categorySlug: ''
        });
        route.params?.onClearFilter();
        navigation.goBack();
    };

    return (
        <FilterViewModelContext.Provider
            value={{
                filters,
                handleApply,
                handleClear,
                handleChange
            }}
        >
            {children}
        </FilterViewModelContext.Provider>
    );
};

export const useFilterViewModel = () => {
    const context = useContext(FilterViewModelContext);
    if (!context) {
        throw new Error(
            "useFilterViewModel must be used within a SpalshViewModelProvider"
        );
    }
    return context;
};
