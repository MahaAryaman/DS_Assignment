import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import TopRoundedView from '../../components/TopRoundedView';
import CommonTextInput from '../../components/CommonTextInput';
import Colors from '../../resources/theme/color';
import CommonButton from '../../components/CommonButton';
import Fonts from '../../resources/theme/font';
import {encryptData} from '../../helper/AppUtil';
import AsyncStorageServices from '../../localStorage/asyncStorageServices';
import {ACCESS_TOKEN} from '../../localStorage/constants';
import {AppContext} from '../../context/AppProvider';

interface LoginScreenProps {}

const LoginScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string>('');
  const [isEmailValid, setIsEmailValid] = React.useState<boolean>(true);
  const [togglePassword, setTogglePassword] = React.useState<boolean>(true);
  const {setUserLoggedIn} = React.useContext(AppContext);
  const GetToken = async () => {
    Keyboard.dismiss();
    setIsLoading(true);
    const loginData = {
      email: email,
      password: password,
    };
    const encryptedData = encryptData(loginData);

    try {
      const response = await fetch(
        'https://678f609d49875e5a1a919410.mockapi.io/demo/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({encryptedData}),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      console.log(data);
      setUserLoggedIn(true);
      AsyncStorageServices.setItem(ACCESS_TOKEN, encryptedData);
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        'Login Failed',
        error instanceof Error ? error.message : 'An error occurred',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const CheckEmail = (text: string, isValid: boolean) => {
    setEmail(text);
    console.log(isValid);
    setIsEmailValid(isValid);
    setErrorMsg('');
  };

  const CheckPass = (text: string) => {
    setPassword(text);
    setErrorMsg('');
  };

  return (
    <TopRoundedView isLoading={isLoading} navigation={navigation}>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.title}>Login</Text>
          </View>
          <View>
            <CommonTextInput
              value={email}
              onChangeInputText={CheckEmail}
              regExp={'email'}
              placeholder="Enter Email"
              placeholderTextColor={Colors.gray()}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 8}}>
              <CommonTextInput
                value={password}
                onChangeInputText={CheckPass}
                placeholder="Enter Password"
                placeholderTextColor={Colors.gray()}
                secureTextEntry={togglePassword}
              />
            </View>
            {password.length != 0 && (
              <TouchableOpacity
                onPress={() => setTogglePassword(!togglePassword)}
                style={styles.passBtn}>
                <Text style={styles.passBtnText}>
                  {togglePassword ? 'Show' : 'Hide'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View>
            <CommonButton
              title="Submit"
              onButtonPress={() => {
                if (email.length == 0 && password.length == 0) {
                  setErrorMsg('Please enter valid credentials');
                } else if (!isEmailValid) {
                  setErrorMsg('Please enter a valid email');
                } else if (password.length <= 3) {
                  setErrorMsg('Password must have more than 3 characters');
                } else {
                  setErrorMsg('');
                  GetToken();
                }
              }}
            />
          </View>
          <View>
            <Text style={styles.error}>{errorMsg ?? ''}</Text>
          </View>
        </View>
      </View>
    </TopRoundedView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {justifyContent: 'center', flex: 1, paddingHorizontal: 20},
  subContainer: {
    padding: 20,
    backgroundColor: Colors.white(),
    borderRadius: 10,
    elevation: 1,
  },
  title: {
    color: Colors.black(),
    fontFamily: Fonts.poppinsBold,
    fontSize: 18,
  },
  passBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    paddingHorizontal: 10,
  },
  passBtnText: {
    color: Colors.blue1(),
    textDecorationLine: 'underline',
    fontSize: 18,
  },
  error: {
    color: Colors.red(),
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: 14,
    textAlign: 'center',
  },
});
