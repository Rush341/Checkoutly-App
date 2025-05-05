import React from 'react';
import { View, TextInput, FlatList, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { useProductListViewModel } from '../viewmodels/ProductListViewModel';
import ProductCard from '../components/ProductCard'; // Updated import
import colors from '../styles/Colors';
import { horizontalScale, verticalScale } from '../utils/Dimensions';
import GlobalStyles from '../styles/GlobalStyles';
import BackIcon from '../assets/icons/back-icon-black.svg';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import FilterIcon from "../assets/icons/filter-filled.svg";
import FontStyles from '../styles/Fontstyles';
import AppLoader from '../components/AppLoader';

const ProductListScreen = () => {
    const { products, searchText, onSearch, onProductPress, filteredProducts, filterCount, navigationToFilterScreen,isLoading } = useProductListViewModel();
    const navigation = useNavigation();

    return (
        <LinearGradient
            colors={[colors.primaryColor, colors.white]} // adjust colors as needed
            style={GlobalStyles.fullFlex}
        >
            <View style={styles.container}>
                <View style={[GlobalStyles.flexRowSpaceBetween]}>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
                        <BackIcon />
                    </TouchableOpacity>
                </View>
                <TextInput
                    placeholder="Search products..."
                    value={searchText}
                    onChangeText={onSearch}
                    style={styles.searchBar}
                    maxLength={100}
                />

                {/* Empty State Handling */}
                {filteredProducts.length == 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={[styles.emptyText, FontStyles.PoppinsRegular18]}>No products found</Text>
                    </View>
                ) : (
                    <FlatList
                        data={filteredProducts}
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        maxToRenderPerBatch={10}
                        keyExtractor={(item, index) => index.toString()}
                        columnWrapperStyle={styles.columnWrapper}
                        numColumns={2}
                        renderItem={({ item, index }) => (
                            <ProductCard
                                product={item}
                                index={index}
                                onPress={() => onProductPress(item)}
                            />
                        )}
                        contentContainerStyle={styles.listContent}
                    />
                )}

                {(products.length > 0 || filterCount > 0) && (
                    <TouchableOpacity
                        style={styles.floatingFilter}
                        onPress={() => {
                            navigationToFilterScreen();
                        }}
                    >
                        <View style={styles.filterCountView}>
                            <Text
                                style={[
                                    FontStyles.PoppinsRegular12,
                                    GlobalStyles.lineHeight18,
                                    GlobalStyles.white
                                ]}
                            >
                                {filterCount}
                            </Text>
                        </View>
                        <FilterIcon width={28} height={28} />
                    </TouchableOpacity>
                )}
            </View>
            <AppLoader visible={isLoading} />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    columnWrapper: {
        justifyContent: 'space-between',
    },
    container: {
        flex: 1,
        marginTop: Platform.OS=="ios"?verticalScale(50):verticalScale(10),
        padding: horizontalScale(16),
    },
    emptyState: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        // marginTop: verticalScale(100),
    },
    emptyText: {
        color: colors.grey,
    },
    filterCountView: {
        alignItems: "center",
        backgroundColor: colors.black,
        borderRadius: horizontalScale(12),
        height: horizontalScale(30),
        justifyContent: "center",
        left: 0,
        position: "absolute",
        top: -10,
        width: horizontalScale(30),
    },
    floatingFilter: {
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: 36,
        bottom: 24,
        elevation: 9,
        height: 72,
        justifyContent: "center",
        position: "absolute",
        right: 24,
        shadowColor: colors.hex000000,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        width: 72,
    },
    listContent: {
        paddingBottom: horizontalScale(32),
    },
    searchBar: {
        backgroundColor: colors.blueShade1,
        borderRadius: horizontalScale(10),
        borderWidth: 1,
        marginVertical: verticalScale(16),
        padding: horizontalScale(12),
    },
});

export default ProductListScreen;
