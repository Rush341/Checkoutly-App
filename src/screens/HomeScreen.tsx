import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useHomeViewModel } from '../viewmodels/HomeViewModel';
import { horizontalScale, verticalScale } from '../utils/Dimensions';
import colors from '../styles/Colors';
import FontStyles from '../styles/Fontstyles';
import GlobalStyles from '../styles/GlobalStyles';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const { user, onLogout, onExplore } = useHomeViewModel();

  return (
    <LinearGradient colors={[colors.primaryColor, colors.seagreen]} style={styles.container}>
      <View style={styles.topSection}>
        <Image source={require('../assets/images/app-logo-icon.png')} style={styles.logo} />
        <Text style={[FontStyles.PoppinsBold20, GlobalStyles.white]}>
          Hello {user?.nickname}!
        </Text>
        <Text style={styles.subtitle}>Welcome back to Checkoutly</Text>
      </View>

      <View style={styles.imageSection}>
        <Image
          source={require('../assets/images/illustartion.webp')}
          style={styles.illustration}
        />
        <View style={styles.buttonOverlay}>
          <TouchableOpacity style={styles.primaryButton} onPress={onExplore}>
            <Text style={[FontStyles.PoppinsMedium16, GlobalStyles.white]}>Explore Products</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryButton} onPress={onLogout}>
          <Text style={[FontStyles.PoppinsMedium16, GlobalStyles.white]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  buttonOverlay: {
    bottom: 30,
    paddingHorizontal: 30,
    position: 'absolute',
    width: '100%',
  },
  container: {
    flex: 1,
  },
  illustration: {
    height: windowHeight * 0.7,
    opacity: 0.4,
    resizeMode: 'cover',
    width: windowWidth,
  },
  imageSection: {
    flex: 1,
    justifyContent: 'flex-end',
    // marginTop: verticalScale(50),
    position: 'relative',
  },
  logo: {
    height: horizontalScale(100),
    marginBottom: verticalScale(20),
    resizeMode: 'contain',
    width: horizontalScale(100),
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#2C2F5B',
    borderRadius: 14,
    marginBottom: 12,
    paddingVertical: 14,
  },
  subtitle: {
    color: '#eee',
    fontSize: 16,
    marginBottom: 10,
  },
  topSection: {
    alignItems: 'center',
    paddingTop: verticalScale(50),
  },
});

export default HomeScreen;
