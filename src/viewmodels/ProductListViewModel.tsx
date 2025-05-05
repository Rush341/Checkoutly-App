/* eslint-disable @typescript-eslint/no-explicit-any */
// src/viewmodels/HomeViewModel.tsx
import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { Product, fetchProducts, ProductListViewProps } from '../models/ProductListViewProps';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/MainStackNavigator';
import { Filter } from '../models/FilterViewProps';
import { useDebounce } from '../hooks/useDebounce';
import { logger } from '../utils/logger';

const ProductListViewModelContext = createContext<ProductListViewProps | undefined>(
    undefined
);

export const ProductListViewModelProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchText, setSearchText] = useState('');
    const [filterCount, setFilterCount] = useState(0)
    const [filter, setFilter] = useState({
        title: '',
        minPrice: '',
        maxPrice: '',
        categorySlug: ''
    })
    const debouncedSearchText = useDebounce(searchText || '', 300); // fallback to empty string
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const search = (debouncedSearchText || '').trim().toLowerCase();

        if (search === '') {
            setFilteredProducts(products);
            return;
        }

        const filtered = products.filter(product =>
            Object.values(product).some(value =>
                typeof value === 'string' &&
                value.toLowerCase().includes(search)
            )
        );

        setFilteredProducts(filtered);
    }, [debouncedSearchText, products]);

    const onSearch = (text: string) => {
        setSearchText(text || ''); // guard against undefined
    };

    const navigationToFilterScreen = () => {
        navigation.navigate('Filter', {
            onApplyFilter,
            onClearFilter,
            filter
        });
    }

    const onApplyFilter = async (filter: Filter) => {
        const { title, categorySlug, minPrice, maxPrice } = filter;
        setFilter(filter)
        const appliedFilters = [title, categorySlug, minPrice, maxPrice].filter(Boolean).length;
        setFilterCount(appliedFilters);
        const response = await fetchProducts(title, categorySlug, minPrice, maxPrice)
        let productsArray: Product[] = [];
        // Case 1: If response is an array directly
        if (Array.isArray(response)) {
            productsArray = response;
        }
        // Case 2: If response is an object with error: false and data object
        else if (!response.error && response.data && typeof response.data === 'object') {
            productsArray = Object.values(response.data);
        }
        else {
            logger.error('Unexpected response format:', response);
            return;
        }

        logger.log(productsArray, 'parsed products');
        setProducts(productsArray);
        setFilteredProducts(productsArray)
    };

    const fetchAndSetProducts = async () => {
        const response = await fetchProducts();
        let productsArray: Product[] = [];

        // Case 1: If response is an array directly
        if (Array.isArray(response)) {
            productsArray = response;
        }
        // Case 2: If response is an object with error: false and data object
        else if (!response.error && response.data && typeof response.data === 'object') {
            productsArray = Object.values(response.data);
        }
        else {
            logger.error('Unexpected response format:', response);
            return;
        }
        logger.log(productsArray, 'parsed products');
        const filteredProducts = productsArray.filter(item => typeof item === 'object' && item !== null);
        setProducts(filteredProducts);
        setFilteredProducts(filteredProducts);
        setIsLoading(false)
    };

    const onClearFilter = () => {
        setFilterCount(0)
        setFilter(
            {
                title: '',
                minPrice: '',
                maxPrice: '',
                categorySlug: ''

            }
        )
        setFilteredProducts(products)
        fetchAndSetProducts();
    }

    useEffect(() => {
        fetchAndSetProducts();
    }, []);

    return (
        <ProductListViewModelContext.Provider
            value={{
                products,
                filteredProducts,
                isLoading,
                searchText,
                onProductPress: (product: Product) => {
                    navigation.navigate('ProductDetails', {
                        product: product
                    })
                },
                onSearch: onSearch,
                filterCount,
                navigationToFilterScreen
            }}
        >
            {children}
        </ProductListViewModelContext.Provider>
    );
};

export const useProductListViewModel = () => {
    const context = useContext(ProductListViewModelContext);
    if (!context) {
        throw new Error(
            "useOnboardingViewModel must be used within a SpalshViewModelProvider"
        );
    }
    return context;
};
