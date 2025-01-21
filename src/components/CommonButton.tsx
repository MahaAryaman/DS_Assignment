import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../resources/theme/color';
import Fonts from '../resources/theme/font';

interface CommonButtonProps {
  title: string;
  btnStyle?: any;
  textStyle?: any;
  onButtonPress?: () => void;
  disabled?: boolean;
  isClickable?: boolean;
  children?: JSX.Element | JSX.Element[] | undefined;
  activeOpacity?: number;
}

const CommonButton = ({
  title,
  btnStyle,
  textStyle,
  onButtonPress,
  disabled = false,
  children,
}: CommonButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, btnStyle]}
      disabled={disabled}
      onPress={onButtonPress}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        {children}
        <Text style={[styles.title, textStyle]}>{title.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 20,
    borderWidth: 0.5,
    width: '50%',
    padding: 10,
    alignSelf: 'center',
    backgroundColor: Colors.blue(),
  },
  title: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: 12,
    color: Colors.white(),
  },
});
