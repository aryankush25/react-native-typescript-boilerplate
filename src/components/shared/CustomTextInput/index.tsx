import React, { ReactNode, useMemo } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Platform,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { isPresent } from '../../../utils/helper';

interface CustomTextInputTypes {
  value: string;
  inputRef?: any;
  autoCompleteType?:
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-number'
    | 'email'
    | 'name'
    | 'password'
    | 'postal-code'
    | 'street-address'
    | 'tel'
    | 'username'
    | 'off'
    | undefined;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad'
    | 'visible-password'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'name-phone-pad'
    | 'twitter'
    | 'web-search'
    | undefined;
  placeholder?: string;
  elevation?: boolean;
  borderColor?: string;
  fontSize?: number;
  textAlignCenter?: boolean;
  fontBold?: boolean;
  caretHidden?: boolean;
  addsOnComponent?: ReactNode;
  onChangeText?: Function;
  onKeyPress?: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
  onFocus?: Function;
}

const getStyleSheet = (
  elevation: boolean,
  borderColor: string,
  fontSize: number,
  textAlignCenter: boolean,
  fontBold: boolean,
) => {
  const styles = StyleSheet.create({
    customTextInputContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: 'white',
      borderRadius: 10,
      overflow: 'hidden',
      borderWidth: 1.2,
      borderColor,
      ...(elevation && { elevation: 4 }),
      paddingHorizontal: 10,
    },
    customTextInput: {
      paddingVertical: Platform.OS === 'ios' ? 12 : 8,
      margin: 0,
      flex: 1,
      fontSize,
      ...(fontBold && { fontWeight: 'bold' }),
      ...(textAlignCenter && { textAlign: 'center' }),
    },
    addsOnComponent: {
      height: '100%',
    },
  });

  return styles;
};

const CustomTextInput = ({
  value,
  inputRef,
  autoCompleteType,
  keyboardType,
  placeholder,
  elevation = true,
  borderColor = '#f5f5f5',
  fontSize = 16,
  fontBold = false,
  textAlignCenter = false,
  caretHidden = false,
  addsOnComponent,
  onChangeText,
  onKeyPress = () => {},
  onFocus,
}: CustomTextInputTypes) => {
  const styles = useMemo(() => {
    return getStyleSheet(
      elevation,
      borderColor,
      fontSize,
      textAlignCenter,
      fontBold,
    );
  }, [borderColor, elevation, fontSize, textAlignCenter, fontBold]);

  return (
    <View style={styles.customTextInputContainer}>
      {isPresent(addsOnComponent) && (
        <View style={styles.addsOnComponent}>{addsOnComponent}</View>
      )}

      <TextInput
        value={value}
        ref={inputRef}
        autoCorrect={false}
        autoCompleteType={autoCompleteType}
        keyboardType={keyboardType}
        placeholder={placeholder}
        caretHidden={caretHidden}
        style={styles.customTextInput}
        onChangeText={(text: string) => onChangeText && onChangeText(text)}
        onKeyPress={onKeyPress}
        onFocus={() => onFocus && onFocus()}
      />
    </View>
  );
};

export default CustomTextInput;
