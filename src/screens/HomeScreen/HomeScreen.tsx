import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {AppImages} from '../../resources/assets/constant';
import TopRoundedView from '../../components/TopRoundedView';
import Colors from '../../resources/theme/color';
import Fonts from '../../resources/theme/font';
import {AppContext} from '../../context/AppProvider';

const HomeScreen = ({navigation}: any) => {
  const {isUserLoggedIn} = React.useContext(AppContext);
  return (
    <TopRoundedView isHome navigation={navigation}>
      <View style={styles.container}>
        <Image style={styles.ImgStyle} source={AppImages.Home} />
        <Text style={styles.textStyle}>
          {isUserLoggedIn
            ? 'You have successfully logged in'
            : 'You are not currently logged in'}
        </Text>
      </View>
    </TopRoundedView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImgStyle: {height: 100, width: 100},
  textStyle: {
    color: Colors.black(),
    fontSize: 18,
    fontFamily: Fonts.poppinsSemiBold,
  },
});
