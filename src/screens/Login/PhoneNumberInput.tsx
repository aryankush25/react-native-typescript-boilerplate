import React, { Fragment, useMemo, useState } from 'react';
import { StyleSheet, Text, Pressable, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomTextInput from '../../components/shared/CustomTextInput';
import { getCountryDataByIso2 } from '../../utils/countryCodes';

const styles = StyleSheet.create({
  countryCodeContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 8,
  },
  countryCodeText: {
    fontSize: 18,
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
  const [phoneNumberSelectorModal, setPhoneNumberSelectorModal] = useState(
    false,
  );

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
            onPress={() =>
              setPhoneNumberSelectorModal(!phoneNumberSelectorModal)
            }>
            <Text style={styles.countryCodeText}>
              {`${currentSelectedCountry?.unicode} +${currentSelectedCountry?.e164_cc}`}
            </Text>

            <Icon name="rocket" size={30} color="#900" />
          </Pressable>
        }
      />

      <Modal animationType="slide" visible={phoneNumberSelectorModal}>
        <SafeAreaView>
          <Text>This is modal</Text>
        </SafeAreaView>
      </Modal>
    </Fragment>
  );
};

export default PhoneNumberInput;
