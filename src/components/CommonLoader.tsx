import * as React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Colors from '../resources/theme/color';

interface CommonLoaderProps {
  style?: StyleProp<ViewStyle>;
}


const CommonLoader = ({style}: CommonLoaderProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.loaderView}>
        <ActivityIndicator color={Colors.white()} size="large" />
      </View>
    </View>
  );
};

export default CommonLoader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: Colors.lightWhite2(),
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: Colors.black(0.6),
  },
  loaderView: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 6,
  },
});
