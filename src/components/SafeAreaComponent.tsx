import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
  SafeAreaView,
  Edge,
} from 'react-native-safe-area-context';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

interface SafeAreaComponentProps {
  edges: Edge[];
}
export type RootAuthStackParamList = {
  LoginScreen: undefined;
  HomeScreen: any;
  ProfileScreen: {accessToken: string};
};
const SafeAreaComponent = (props: SafeAreaComponentProps) => {
  const {edges} = props;
  const RootStack = createNativeStackNavigator<RootAuthStackParamList>();

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SafeAreaView edges={edges} style={styles.container}>
        <NavigationContainer>
          <RootStack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName={'HomeScreen'}>
            <RootStack.Screen name="LoginScreen" component={LoginScreen} />
            <RootStack.Screen name="HomeScreen" component={HomeScreen} />
            <RootStack.Screen name="ProfileScreen" component={ProfileScreen} />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SafeAreaComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
