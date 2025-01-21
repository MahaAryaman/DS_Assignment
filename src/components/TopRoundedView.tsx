import React, {useEffect} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {useNetInfo} from '@react-native-community/netinfo';
import moment from 'moment';
import Colors from '../resources/theme/color';
import Fonts from '../resources/theme/font';
import CommonLoader from './CommonLoader';
import {AppContext} from '../context/AppProvider';


interface TopRoundedViewProps {
  showHeader?: boolean;
  style?: StyleProp<ViewStyle> | undefined;
  children: JSX.Element | JSX.Element[] | undefined;
  navigation?: any;
  isLoading?: boolean;
  showSnack?: boolean;
  snackShowstyle?: boolean;
  isHome?: boolean;
}

const TopRoundedView = ({
  showHeader = true,
  isHome = false,
  style,
  children,
  navigation,
  isLoading = false,
  showSnack = true,
  snackShowstyle = false,
}: TopRoundedViewProps) => {
  const netInfoState = useNetInfo();
  const [isInternetConnected, setIsInternetConnected] = React.useState(true);
  const {isUserLoggedIn} = React.useContext(AppContext);
  const [showSnackBar, setShowSnackBar] = React.useState(false);

  useEffect(() => {
    if (
      netInfoState &&
      netInfoState.isConnected !== null &&
      netInfoState.isConnected !== isInternetConnected
    ) {
      setIsInternetConnected(netInfoState.isConnected ?? true);
      setShowSnackBar(true);
      setTimeout(() => {
        setShowSnackBar(false);
      }, 3000);
      if (netInfoState.isConnected) {
        setTimeout(() => {
          setShowSnackBar(false);
        }, 3000);
      }
    } else if (netInfoState.isConnected && showSnackBar) {
      setTimeout(() => {
        setShowSnackBar(false);
      }, 3000);
    }
  }, [netInfoState]);

  const styles = getStyles(isInternetConnected);

  const navigateToScreen = () => {
    if (isUserLoggedIn) {
      navigation.navigate('ProfileScreen');
    } else {
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <>
      {showHeader && (
        <View
          style={{
            backgroundColor: Colors.white(),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 6,
            height: 90,
            width: '100%',
            paddingBottom: 10,
          }}>
          {isHome ? (
            <>
              <View style={{paddingHorizontal: 10}}>
                <Text
                  style={{
                    color: Colors.black(),
                    fontSize: 18,
                    fontFamily: Fonts.poppinsSemiBold,
                  }}>
                  Welcome
                </Text>
                <Text
                  style={{
                    color: Colors.black(),
                    fontSize: 18,
                    fontFamily: Fonts.poppinsBold,
                  }}>
                  {moment().format('DD MMM YYYY')}
                </Text>
              </View>

              <TouchableOpacity
                onPress={navigateToScreen}
                style={{paddingHorizontal: 10}}>
                <Text
                  style={{
                    color: Colors.black(),
                    fontSize: 18,
                    fontFamily: Fonts.poppinsItalic,
                    textDecorationLine: 'underline',
                  }}>
                  {isUserLoggedIn ? 'Profile' : 'Login'}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              disabled={isLoading}
              style={{paddingHorizontal: 10}}
              onPress={() => {
                navigation.goBack();
              }}>
              <Text
                style={{
                  color: Colors.black(),
                  fontSize: 18,
                  fontFamily: Fonts.poppinsSemiBold,
                }}>
                Back
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <View style={[styles.container, style]}>
        {children}
        {isLoading && <CommonLoader />}

        {showSnackBar && showSnack && (
          <View style={[styles.snackBar, {marginTop: snackShowstyle ? 17 : 0}]}>
            <Text style={styles.snackBarMessage}>
              {isInternetConnected ? 'Back Online' : 'No internet connectin'}
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

export default React.memo(TopRoundedView);

const getStyles = (isInternetConnected: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: -5,
      backgroundColor: Colors.lightWhite(),
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    noInternetView: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    loader: {
      width: '100%',
    },
    tabView: {
      backgroundColor: Colors.white(),
      marginTop: 30,
      height: 60,
      paddingHorizontal: 20,
    },
    snackBar: {
      position: 'absolute',
      overflow: 'hidden',
      backgroundColor: isInternetConnected ? Colors.snackBlue() : Colors.gray(),
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 20,
      // marginTop:scaleSize(15)
    },
    snackBarMessage: {
      fontFamily: Fonts.poppinsMedium,
      fontSize: 14,
      color: Colors.white(),
    },
  });
