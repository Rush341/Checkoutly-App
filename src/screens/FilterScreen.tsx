import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { useFilterViewModel } from '../viewmodels/FilterViewModel';
import BackIcon from '../assets/icons/back-icon-black.svg';
import colors from '../styles/Colors';
import FontStyles from '../styles/Fontstyles';
import GlobalStyles from '../styles/GlobalStyles';
import { horizontalScale, verticalScale } from '../utils/Dimensions';

const FilterScreen = () => {
    const navigation = useNavigation();
    const {
        filters,
        handleChange,
        handleApply,
        handleClear,
    } = useFilterViewModel();

    return (
        <LinearGradient
            colors={[colors.primaryColor, colors.white]}
            style={GlobalStyles.fullFlex}
        >
            <View style={styles.container}>
                <View style={[GlobalStyles.flexRowSpaceBetween, GlobalStyles.marginBottom20]}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackIcon />
                    </TouchableOpacity>
                    <Text style={[FontStyles.PoppinsSemiBold18]}>
                        Filters
                    </Text>
                    <View style={styles.width24} /> 
                </View>

                <TextInput
                    placeholder="Title"
                    value={filters.title}
                    onChangeText={text => handleChange('title', text)}
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize='none'
                    keyboardType='default'
                />
                <TextInput
                    placeholder="Min Price"
                    value={filters.minPrice}
                    onChangeText={text => handleChange('minPrice', text)}
                    keyboardType="numeric"
                    style={styles.input}
                     autoCorrect={false}
                    autoCapitalize='none'
                />
                <TextInput
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChangeText={text => handleChange('maxPrice', text)}
                    keyboardType="numeric"
                    style={styles.input}
                     autoCorrect={false}
                    autoCapitalize='none'
                />
                <TextInput
                    placeholder="Category Slug"
                    value={filters.categorySlug}
                    onChangeText={text => handleChange('categorySlug', text)}
                    style={styles.input}
                     autoCorrect={false}
                    autoCapitalize='none'
                />

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.clearButton}
                        onPress={handleClear}
                    >
                        <Text  style={[FontStyles.PoppinsMedium16, GlobalStyles.white]}>Clear All</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.applyButton}
                        onPress={handleApply}
                    >
                        <Text style={[FontStyles.PoppinsMedium16, GlobalStyles.white]}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    applyButton: {
        alignItems: 'center',
        backgroundColor: colors.primaryColor,
        borderRadius: horizontalScale(10),
        paddingHorizontal: horizontalScale(24),
        paddingVertical: verticalScale(12),
        width: '55%'
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: verticalScale(24),
    },
    clearButton: {
        alignItems: 'center',
        backgroundColor: colors.error,
        borderRadius: horizontalScale(10),
        paddingHorizontal: horizontalScale(24),
        paddingVertical: verticalScale(12),
        width: '35%'
    },
    container: {
        flex: 1,
        marginTop: verticalScale(50),
        padding: horizontalScale(16),
    },
    input: {
        backgroundColor: colors.blueShade1,
        borderRadius: horizontalScale(10),
        borderWidth: 1,
        marginVertical: verticalScale(8),
        padding: horizontalScale(12),
    },
    width24: { width: horizontalScale(24) }
});

export default FilterScreen;
