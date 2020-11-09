import React, { useCallback, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/shared/CustomButton';
import CustomTextInput from '../../components/shared/CustomTextInput';
import ImageContainer from '../../container/ImageContainer';
import { confirmOtpRequest } from '../../store/actions/userDataActions';
import { getLoginData } from '../../store/selectors/userSelectors';

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

const Verification = () => {
  const dispatch = useDispatch();
  const [opt, setOtp] = useState('');

  const { otpConfirmLoading } = useSelector(getLoginData);

  const handleConfirmOtpRequest = useCallback(() => {
    dispatch(confirmOtpRequest(opt));
  }, [dispatch, opt]);

  return (
    <ImageContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.body}>
          <CustomTextInput
            value={opt}
            onChangeText={(text: string) => setOtp(text)}
          />

          <CustomButton
            text="Confirm Code"
            onPress={handleConfirmOtpRequest}
            loading={otpConfirmLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </ImageContainer>
  );
};

export default Verification;
