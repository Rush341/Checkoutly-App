import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Platform,
} from 'react-native';
import ReanimatedCarousel from 'react-native-reanimated-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import BackIcon from '../assets/icons/back-icon-black.svg';
import colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';
import FontStyles from '../styles/Fontstyles';
import { horizontalScale, verticalScale } from '../utils/Dimensions';
import { RootStackParamList } from '../navigation/MainStackNavigator';

const { width: screenWidth } = Dimensions.get('window');
type ProductListRouteProps = RouteProp<RootStackParamList, 'ProductDetails'>;

const ProductDetailsScreen = () => {
    const route = useRoute<ProductListRouteProps>();
    const { product } = route.params;
    const navigation = useNavigation();

    return (
        <LinearGradient
            colors={[colors.primaryColor, colors.white]}
            style={GlobalStyles.fullFlex}
        >
            <View style={styles.container}>
                {/* Top Bar */}
                <View style={GlobalStyles.flexRowSpaceBetween}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackIcon />
                    </TouchableOpacity>
                </View>

                {/* Image Carousel (Reanimated) */}
                <ReanimatedCarousel
                    loop
                    width={screenWidth * 0.9}
                    height={verticalScale(300)}
                    autoPlay={false}
                    scrollAnimationDuration={500}
                    data={product.images}
                    style={styles.carouselContainer}
                    renderItem={({ item }) => (
                        <FastImage
                            source={{ uri: item }}
                            style={styles.carouselImage}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    )}
                />

                {/* Product Info */}
                <View style={styles.infoSection}>
                    <Text style={[FontStyles.PoppinsSemiBold20, styles.title]}>
                        {product.title}
                    </Text>
                    <Text style={[FontStyles.PoppinsRegular14, styles.price]}>
                        ${product.price}
                    </Text>
                    <Text style={[FontStyles.PoppinsRegular14, styles.description]}>
                        {product.description}
                    </Text>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        alignSelf: 'center',
        marginTop: verticalScale(24),
    },
    carouselImage: {
        borderRadius: 16,
        height: verticalScale(300),
        width: screenWidth * 0.9,
    },
    container: {
        flex: 1,
        marginTop: Platform.OS == "ios" ? verticalScale(50) : verticalScale(10),
        paddingHorizontal: horizontalScale(16),
    },
    description: {
        color: colors.grayDark,
        lineHeight: 20,
    },
    infoSection: {
        marginTop: verticalScale(24),
    },
    price: {
        color: colors.green,
        marginBottom: verticalScale(12),
    },
    title: {
        marginBottom: verticalScale(8),
    },
});

export default ProductDetailsScreen;
