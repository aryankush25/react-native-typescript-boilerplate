import React, { Fragment, useCallback, useState } from 'react';
import { ScrollView, View, StyleSheet, TextInput, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/shared/CustomButton';
import CustomTextInput from '../../components/shared/CustomTextInput';
import ImageContainer from '../../container/ImageContainer';
import {
  signinPhoneNumberRequest,
  confirmOtpRequest,
} from '../../store/actions/userDataActions';
import { getLoginData } from '../../store/selectors/userSelectors';
import { isNilOrEmpty } from '../../utils/helper';

const styles = StyleSheet.create({
  body: {
    marginHorizontal: '8%',
    marginVertical: '8%',
  },
});

const Login = () => {
  const dispatch = useDispatch();
  const { confirmation, signinLoading, otpConfirmLoading } = useSelector(
    getLoginData,
  );

  const [phoneNumber, setPhoneNumber] = useState('7017711846');
  const [opt, setOtp] = useState('');

  const handleLoginRequest = useCallback(() => {
    dispatch(signinPhoneNumberRequest('+91' + phoneNumber));
  }, [dispatch, phoneNumber]);

  const handleConfirmOtpRequest = useCallback(() => {
    dispatch(confirmOtpRequest(opt));
  }, [dispatch, opt]);

  return (
    <ImageContainer>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.body}>
          {isNilOrEmpty(confirmation) ? (
            <Fragment>
              <CustomTextInput
                autoCompleteType="tel"
                keyboardType="phone-pad"
                value={phoneNumber}
                placeholder="Phone Number"
                onChangeText={setPhoneNumber}
              />

              <CustomButton
                text="Send OTP"
                onPress={handleLoginRequest}
                loading={signinLoading}
              />
            </Fragment>
          ) : (
            <Fragment>
              <TextInput value={opt} onChangeText={(text) => setOtp(text)} />

              <CustomButton
                text="Confirm Code"
                onPress={handleConfirmOtpRequest}
                loading={otpConfirmLoading}
              />
            </Fragment>
          )}
        </View>
      </ScrollView>
    </ImageContainer>
  );
};

export default Login;
