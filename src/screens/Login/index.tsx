import React, { Fragment, useCallback, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
  StyleSheet,
  Button,
  TextInput,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useDispatch, useSelector } from 'react-redux';
import {
  signinPhoneNumberRequest,
  confirmOtpRequest,
} from '../../store/actions/userDataActions';
import { getLoginData } from '../../store/selectors/userSelectors';
import { isNilOrEmpty } from '../../utils/helper';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
});

const Login = () => {
  const dispatch = useDispatch();
  const { confirmation } = useSelector(getLoginData);

  const [opt, setOtp] = useState('');

  const handleLoginRequest = useCallback(() => {
    dispatch(signinPhoneNumberRequest('+917017711846'));
  }, [dispatch]);

  const handleConfirmOtpRequest = useCallback(() => {
    dispatch(confirmOtpRequest(opt));
  }, [dispatch, opt]);

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            {isNilOrEmpty(confirmation) ? (
              <Button
                title="Login"
                color="black"
                onPress={handleLoginRequest}
              />
            ) : (
              <Fragment>
                <TextInput value={opt} onChangeText={(text) => setOtp(text)} />
                <Button
                  title="Confirm Code"
                  onPress={handleConfirmOtpRequest}
                />
              </Fragment>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default Login;
