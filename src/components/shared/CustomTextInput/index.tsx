import React, { ReactNode } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { isPresent } from '../../../utils/helper';

interface CustomTextInputTypes {
  value: string;
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
  addsOnComponent?: ReactNode;
  onChangeText: Function;
}

const styles = StyleSheet.create({
  customTextInputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: 'grey',
    elevation: 4,
    paddingHorizontal: 10,
  },
  customTextInput: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    margin: 0,
    flex: 1,
    fontSize: 16,
  },
  addsOnComponent: {
    height: '100%',
  },
});

const CustomTextInput = ({
  value,
  autoCompleteType,
  keyboardType,
  placeholder,
  addsOnComponent,
  onChangeText,
}: CustomTextInputTypes) => {
  return (
    <View style={styles.customTextInputContainer}>
      {isPresent(addsOnComponent) && (
        <View style={styles.addsOnComponent}>{addsOnComponent}</View>
      )}

      <TextInput
        value={value}
        autoCorrect={false}
        autoCompleteType={autoCompleteType}
        keyboardType={keyboardType}
        placeholder={placeholder}
        style={styles.customTextInput}
        onChangeText={(text: string) => onChangeText(text)}
      />
    </View>
  );
};

export default CustomTextInput;
