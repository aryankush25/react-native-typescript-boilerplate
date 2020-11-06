import React, { Fragment, useCallback, useState } from 'react';
import { ScrollView, View, StyleSheet, Button, TextInput } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/shared/CustomButton';
import ImageContainer from '../../container/ImageContainer';
import {
  signinPhoneNumberRequest,
  confirmOtpRequest,
} from '../../store/actions/userDataActions';
import { getLoginData } from '../../store/selectors/userSelectors';
import { isNilOrEmpty } from '../../utils/helper';

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    marginHorizontal: '8%',
  },
});

const Login = () => {
  const dispatch = useDispatch();
  const { confirmation, signinLoading, otpConfirmLoading } = useSelector(
    getLoginData,
  );

  const [opt, setOtp] = useState('');

  const handleLoginRequest = useCallback(() => {
    dispatch(signinPhoneNumberRequest('+917017711846'));
  }, [dispatch]);

  const handleConfirmOtpRequest = useCallback(() => {
    dispatch(confirmOtpRequest(opt));
  }, [dispatch, opt]);

  return (
    <ImageContainer>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.body}>
          {isNilOrEmpty(confirmation) ? (
            <CustomButton
              text="Send OTP"
              onPress={handleLoginRequest}
              loading={signinLoading}
            />
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
