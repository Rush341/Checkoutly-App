import React from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { horizontalScale, verticalScale } from '../utils/Dimensions';
import FontStyles from '../styles/Fontstyles';
import GlobalStyles from '../styles/GlobalStyles';
import colors from '../styles/Colors';
import { useOnboardingViewModel } from '../viewmodels/OnboardingViewModel';

const OnboardingScreen = () => {
    const { onLogin } = useOnboardingViewModel()

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/images/app-logo-icon.png")}
                style={styles.appIcon}
            />
            <Text style={[FontStyles.PoppinsMedium16, GlobalStyles.black, GlobalStyles.textAlign]}>
                Shop with Checkoutly
            </Text>
            <Text style={[FontStyles.PoppinsRegular12, GlobalStyles.black, GlobalStyles.textAlign, GlobalStyles.marginTop16]}>
                Your one-stop solution for all your shopping needs.
            </Text>
            <TouchableOpacity onPress={onLogin} activeOpacity={1} style={styles.loginButton}>
                <Text style={[GlobalStyles.white, FontStyles.PoppinsMedium16]}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    appIcon: {
        borderRadius: 100,
        height: verticalScale(200),
        marginBottom: verticalScale(20),
        marginTop: verticalScale(150),
        width: horizontalScale(200),
    },
    container: {
        alignItems: 'center',
        backgroundColor: colors.white,
        flex: 1,
        // justifyContent: 'center',
    },
    loginButton: {
        alignItems: 'center',
        backgroundColor: colors.primaryColor,
        borderRadius: 10,
        bottom: verticalScale(150),
        height: verticalScale(50),
        justifyContent: 'center',
        paddingHorizontal: horizontalScale(20),
        position: 'absolute',
        width: horizontalScale(200),
    },
});

export default OnboardingScreen;