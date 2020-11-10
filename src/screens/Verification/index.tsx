import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  ActivityIndicator,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomTextInput from '../../components/shared/CustomTextInput';
import { confirmOtpRequest } from '../../store/actions/userDataActions';
import { getLoginData } from '../../store/selectors/userSelectors';
import { isNilOrEmpty, isPresent } from '../../utils/helper';

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: '4%',
    height: '100%',
  },
  headingContainer: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 18,
    marginLeft: 16,
  },
  subHeadingContainer: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subHeadingText: {
    marginLeft: 16,
    paddingVertical: 6,
  },
  subHeadingTextPhoneNumber: {
    marginLeft: 16,
    paddingVertical: 6,
    fontWeight: 'bold',
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  otpInputContainer: {
    marginVertical: 22,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  singleOtpInputContainer: {
    width: 45,
  },
  activityIndicatorContainer: {
    marginVertical: 30,
  },
});

const Verification = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const otpLength = 6;

  const [otpArray, setOtp] = useState(_.fill(Array(otpLength), ''));
  const otpInputRef: any = useRef([]);

  const { otpConfirmLoading } = useSelector(getLoginData);

  const currentPosition = useMemo(() => {
    let pos = 0;
    let isAnyEmpty = false;

    otpArray.every((value: string, index: number) => {
      if (isNilOrEmpty(value)) {
        pos = index;
        isAnyEmpty = true;
        return false;
      }

      return true;
    });

    if (!isAnyEmpty) {
      return otpArray.length - 1;
    }

    return pos;
  }, [otpArray]);

  const phoneNumber = _.get(route, 'params.phoneNumber', '');

  const otp = otpArray.join('');

  const setOtpArray = useCallback(
    (value: string) => {
      setOtp((otpLocal: string[]) => {
        return otpLocal.map((singleOtpValue: string, index: number) => {
          if (
            value === 'Backspace' &&
            isNilOrEmpty(otpLocal[currentPosition]) &&
            index === currentPosition - 1
          ) {
            otpInputRef.current[index].focus();

            return '';
          }

          if (index === currentPosition) {
            if (value === 'Backspace') {
              return '';
            }

            if (isNilOrEmpty(otpLocal[index])) {
              return value;
            }
          }

          return singleOtpValue;
        });
      });
    },
    [currentPosition],
  );

  const onKeyPress = useCallback(
    (value: string) => {
      if (value === 'Backspace' || (Number(value) >= 0 && Number(value) <= 9)) {
        setOtpArray(value);
      }
    },
    [setOtpArray],
  );

  useEffect(() => {
    otpInputRef.current[currentPosition].focus();
  }, [currentPosition]);

  useEffect(() => {
    if (otp.length === otpArray.length) {
      otpInputRef.current[otp.length - 1].blur();

      dispatch(confirmOtpRequest(otpArray.join('')));
    }
  }, [dispatch, otp, otpArray]);

  return (
    <SafeAreaView>
      <View style={styles.body}>
        <View style={styles.headingContainer}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="arrow-left" size={22} color="black" />
          </Pressable>

          <Text style={styles.headingText}>Enter Verification Code</Text>
        </View>

        <View style={styles.subHeadingContainer}>
          <Text style={styles.subHeadingText}>
            We have sent a verification code to
          </Text>
          <Text style={styles.subHeadingTextPhoneNumber}>{phoneNumber}</Text>
        </View>

        <View style={styles.otpInputContainer}>
          {otpArray.map((singleOtp: string, index: number) => {
            return (
              <View
                key={`otp-input${index}`}
                style={styles.singleOtpInputContainer}>
                <CustomTextInput
                  inputRef={(element: any) =>
                    (otpInputRef.current[index] = element)
                  }
                  value={singleOtp}
                  keyboardType="number-pad"
                  elevation={false}
                  borderColor={
                    isPresent(singleOtp) || index === 0 ? 'black' : '#f5f5f5'
                  }
                  fontBold
                  textAlignCenter
                  caretHidden
                  onChangeText={(text: string) => {
                    if (Platform.OS === 'android') {
                      onKeyPress(text);
                    }
                  }}
                  onKeyPress={(
                    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
                  ) => {
                    const value = e.nativeEvent.key;

                    onKeyPress(value);
                  }}
                  onFocus={() => {
                    otpInputRef.current[currentPosition].focus();
                  }}
                />
              </View>
            );
          })}
        </View>

        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator
            animating={otpConfirmLoading}
            size="large"
            color="#ff013b"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Verification;
