import * as React from 'react';
import {Text, View, StyleSheet, TextInput, TextInputProps} from 'react-native';
import Colors from '../resources/theme/color';

interface CommonTextInputProps extends TextInputProps {
  value?: string;
  onSubmitEditing?: () => void;
  onFocusHandler?: () => void;
  regExp?: 'email' | string;
  showError?: boolean;
  errorMessage?: string;
  onChangeInputText?: (text: string, isValid: boolean) => void;
  inputStyle?: any;
}

const CommonTextInput = (props: CommonTextInputProps) => {
  const {
    value,
    secureTextEntry,
    showError = false,
    errorMessage,
    regExp,
    editable,
    keyboardType,
    onChangeInputText,
    onSubmitEditing,
    inputStyle,
  } = props;

  const [isFocused, setIsFocused] = React.useState(false);
  const [wasFocused, setWasFocused] = React.useState(false);
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateInput = (text: string): boolean => {
    if (!regExp) return true;

    if (regExp === 'email') {
      return EMAIL_REGEX.test(text);
    }
    return true;
  };

  const handleChangeText = (text: string) => {
    const isValid = validateInput(text);
    if (onChangeInputText) {
      onChangeInputText(text, isValid);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    props.onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    setWasFocused(true);
    props.onBlur?.();
  };

  const shouldShowValidation = wasFocused && !isFocused;

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onSubmitEditing={onSubmitEditing}
        secureTextEntry={secureTextEntry}
        editable={editable}
        keyboardType={regExp === 'email' ? 'email-address' : keyboardType}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
        onChangeText={handleChangeText}
        style={[
          styles.input,
          inputStyle,
          shouldShowValidation &&
            value &&
            regExp &&
            !validateInput(value) &&
            styles.invalidInput,
        ]}
      />
      {showError && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

export default CommonTextInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray(),
    borderRadius: 5,
    padding: 10,
  },
  invalidInput: {
    borderColor: Colors.red(),
  },
  error: {
    color: Colors.red(),
    fontSize: 12,
    marginTop: 5,
  },
});
