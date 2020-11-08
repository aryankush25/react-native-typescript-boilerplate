import React, { Fragment, useMemo, useState, useCallback } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomTextInput from '../../components/shared/CustomTextInput';
import { getCountryDataByIso2 } from '../../utils/countryCodes';
import PhoneNumberSelectorModal from './PhoneNumberSelectorModal';

const styles = StyleSheet.create({
  countryCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 8,
  },
  countryCodeText: {
    fontSize: 18,
    marginRight: 6,
  },
});

interface PhoneNumberInputTypes {
  phoneNumber: string;
  countryCode: string;
  setPhoneNumber: Function;
  setCountryCode: Function;
}

const PhoneNumberInput = ({
  phoneNumber,
  countryCode,
  setPhoneNumber,
  setCountryCode,
}: PhoneNumberInputTypes) => {
  const [
    isPhoneNumberSelectorModalOpen,
    setIsPhoneNumberSelectorModalOpen,
  ] = useState(false);

  const toggleIsPhoneNumberSelectorModalOpen = useCallback(() => {
    setIsPhoneNumberSelectorModalOpen(
      (isPhoneNumberSelectorModalOpenLocal) =>
        !isPhoneNumberSelectorModalOpenLocal,
    );
  }, []);

  const currentSelectedCountry = useMemo(() => {
    return getCountryDataByIso2(countryCode);
  }, [countryCode]);

  return (
    <Fragment>
      <CustomTextInput
        autoCompleteType="tel"
        keyboardType="phone-pad"
        value={phoneNumber}
        placeholder="Phone Number"
        onChangeText={setPhoneNumber}
        addsOnComponent={
          <Pressable
            style={styles.countryCodeContainer}
            onPress={() => toggleIsPhoneNumberSelectorModalOpen()}>
            <Text style={styles.countryCodeText}>
              {`${currentSelectedCountry?.unicode} +${currentSelectedCountry?.e164_cc}`}
            </Text>

            <Icon name="angle-down" size={20} color="black" />
          </Pressable>
        }
      />

      <PhoneNumberSelectorModal
        isPhoneNumberSelectorModalOpen={isPhoneNumberSelectorModalOpen}
        toggleIsPhoneNumberSelectorModalOpen={
          toggleIsPhoneNumberSelectorModalOpen
        }
        setCountryCode={setCountryCode}
      />
    </Fragment>
  );
};

export default PhoneNumberInput;
