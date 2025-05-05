import { StyleSheet, Dimensions } from "react-native";
import colors from "./Colors";
import { horizontalScale, verticalScale } from "../utils/Dimensions";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const GlobalStyles = StyleSheet.create({
    // ---------------- GENERAL ------------------
    alignItemsCenter: { alignItems: 'center' },
    alignSelfCenter: { alignSelf: 'center' },
    alignSelfStart: { alignSelf: 'flex-start' },
    alignSelfEnd: { alignSelf: 'flex-end' },
    alignItemEnd: { alignItems: 'flex-end' },
    black: { color: colors.black },
    flexEnd: {
        justifyContent: 'flex-end',
    },
    flexRow: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    flexRowSpaceBetween: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    fullFlex: {
        backgroundColor: colors.white,
        flex: 1
    },
    fullWidth: {
        width: '100%',
    },
    halfWidth: {
        width: '50%'
    },
    heightFull: { height: '100%' },
    lineHeight18: {
        lineHeight: verticalScale(18)
    },
    lineHeight20: {
        lineHeight: verticalScale(20)
    },
    lineHeight22: {
        lineHeight: verticalScale(22)
    },
    lineHeight24: {
        lineHeight: verticalScale(24)
    },
    lineHeight26: {
        lineHeight: verticalScale(26)
    },
    lineHeight32: {
        lineHeight: verticalScale(32)
    },
    marginBottom20: {
        marginBottom: verticalScale(20)
    },
    marginRight10:{
        marginRight: 10
    },
    marginTop16: {
        marginTop: verticalScale(16)
    },
    textAlign: {
        textAlign: 'center'
    },
    textAlignJustify: {
        textAlign: 'justify'
    },
    white: { color: colors.white },
    width40: {
        width: "40%",
    },
    width60: {
        width: "60%",
    },
});

export default GlobalStyles;
