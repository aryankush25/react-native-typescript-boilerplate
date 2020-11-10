import React, { useCallback, useMemo, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/shared/CustomButton';
import ImageContainer from '../../container/ImageContainer';
import { signinPhoneNumberRequest } from '../../store/actions/userDataActions';
import { getLoginData } from '../../store/selectors/userSelectors';
import { getCountryDataByIso2 } from '../../utils/countryCodes';
import PhoneNumberInput from './PhoneNumberInput';

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: '8%',
    paddingVertical: '20%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  verticalMarginContainer: {
    marginVertical: 10,
  },
});

const Login = () => {
  const dispatch = useDispatch();
  const { signinLoading } = useSelector(getLoginData);

  const [countryCode, setCountryCode] = useState('IN');
  const [phoneNumber, setPhoneNumber] = useState('');

  const { phoneNumberWithCode, isValidNumberLength } = useMemo(() => {
    const currentSelectedCountry = getCountryDataByIso2(countryCode);

    return {
      phoneNumberWithCode: '+' + currentSelectedCountry?.e164_cc + phoneNumber,
      isValidNumberLength:
        currentSelectedCountry?.example.length === phoneNumber.length,
    };
  }, [countryCode, phoneNumber]);

  const handleLoginRequest = useCallback(() => {
    dispatch(signinPhoneNumberRequest(phoneNumberWithCode));
  }, [dispatch, phoneNumberWithCode]);

  return (
    <ImageContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.body}>
          <View style={styles.verticalMarginContainer}>
            <PhoneNumberInput
              phoneNumber={phoneNumber}
              countryCode={countryCode}
              setPhoneNumber={setPhoneNumber}
              setCountryCode={setCountryCode}
            />
          </View>

          <View style={styles.verticalMarginContainer}>
            <CustomButton
              text="Send OTP"
              onPress={() => isValidNumberLength && handleLoginRequest()}
              loading={signinLoading}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageContainer>
  );
};

export default Login;
