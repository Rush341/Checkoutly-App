import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import FastImage from "react-native-fast-image";
import colors from "../styles/Colors";
import FontStyles from "../styles/Fontstyles";
import { Product } from "../models/ProductListViewProps"; // Assuming this is the Product interface
import GlobalStyles from "../styles/GlobalStyles";
import { horizontalScale, verticalScale } from "../utils/Dimensions";

type Props = {
    product: Product;
    onPress: () => void;
    index: number;
};

const ProductCard: React.FC<Props> = ({
    product,
    onPress,
    index
}) => {
    const mainImageUri = product.images?.[0];

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={[styles.card, index % 2 == 0 ? GlobalStyles.marginRight10 : null]}>
            <View style={styles.imageContainer}>
                <FastImage
                    source={{ uri: mainImageUri }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.contentContainer}>
                <Text style={[GlobalStyles.black, FontStyles.PoppinsMedium15]}>
                    {product?.title}
                </Text>
                <Text style={[GlobalStyles.black, FontStyles.PoppinsRegular13]}>
                    {product.category?.name}
                </Text>
                <Text style={[GlobalStyles.black, FontStyles.PoppinsRegular11]} numberOfLines={2}>
                    {product.description}
                </Text>
            </View>
            <View style={styles.priceTag}>
                <Text style={[styles.priceText, FontStyles.PoppinsBold18]}>
                    $ {new Intl.NumberFormat("en-IN").format(product.price)}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.dropShadowColor,
        elevation: 1,
        flexDirection: "column",
        flexGrow: 1,
        marginBottom: verticalScale(16),
        overflow: "hidden",
        width: Platform.OS=='ios'?'48%':'45%',
    },
    contentContainer: {
        flex: 1,
        // flexDirection: "column",
        // justifyContent: "space-between",
        marginTop: verticalScale(8),
        paddingHorizontal: horizontalScale(5)
    },
    image: {
        height: "100%",
        width: "100%",
    },
    imageContainer: {
        aspectRatio: 1,
        position: "relative",
        width: "100%",
    },
    priceTag: {
        borderRadius: horizontalScale(12),
        paddingHorizontal: horizontalScale(10),
        paddingVertical: 4,
    },
    priceText: {
        color: colors.hex000000,
    },
});

export default ProductCard;
