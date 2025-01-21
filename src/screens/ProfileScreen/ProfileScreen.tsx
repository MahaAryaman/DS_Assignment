import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import TopRoundedView from '../../components/TopRoundedView';
import AsyncStorageServices from '../../localStorage/asyncStorageServices';
import {ACCESS_TOKEN} from '../../localStorage/constants';
import {decryptData} from '../../helper/AppUtil';
import Colors from '../../resources/theme/color';
import Fonts from '../../resources/theme/font';
import CommonButton from '../../components/CommonButton';
import {AppContext} from '../../context/AppProvider';

const ProfileScreen = ({navigation}: any) => {
  const {setUserLoggedIn} = React.useContext(AppContext);
  const [profileData, setProfileData] = React.useState<Object>();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  React.useEffect(() => {
    GetProfile();
  }, []);
  const GetProfile = async () => {
    const data = (await AsyncStorageServices.getItem(ACCESS_TOKEN)) ?? null;
    if (data != null) {
      const newData = decryptData(data);
      setProfileData(newData);
    }
  };

  const onLogoutPress = () => {
    AsyncStorageServices.removeAll();
    setUserLoggedIn(false);
    navigation.goBack();
  };
  return (
    <TopRoundedView navigation={navigation}>
      <View style={styles.container}>
        <View style={{padding: 20, backgroundColor: Colors.white()}}>
          <View>
            <Text
              style={{
                color: Colors.black(),
                fontFamily: Fonts.poppinsSemiBold,
                fontSize: 16,
              }}>
              Your Email
            </Text>
            <Text
              style={{
                color: Colors.black(),
                fontFamily: Fonts.poppinsBold,
                fontSize: 16,
              }}>
              {profileData?.email}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 8}}>
              <Text
                style={{
                  color: Colors.black(),
                  fontFamily: Fonts.poppinsSemiBold,
                  fontSize: 16,
                }}>
                Your Password
              </Text>
              <Text
                style={{
                  color: Colors.black(),
                  fontFamily: Fonts.poppinsBold,
                  fontSize: 16,
                }}>
                {showPassword ? profileData?.password : 'XXXX'}
              </Text>
            </View>
            <TouchableOpacity
              style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}
              onPress={() => {
                setShowPassword(!showPassword);
              }}>
              <Text
                style={{
                  color: Colors.blue1(),
                  fontFamily: Fonts.poppinsBold,
                  fontSize: 16,
                }}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <CommonButton title="Logout" onButtonPress={onLogoutPress} />
          </View>
        </View>
      </View>
    </TopRoundedView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 20},
});
