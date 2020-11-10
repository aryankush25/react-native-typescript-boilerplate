import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, DefaultTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/shared/CustomButton';
import { isNilOrEmpty } from '../../utils/helper';
import { updateUserProfileRequest } from '../../store/actions/userDataActions';
import { getUserProfileData } from '../../store/selectors/userSelectors';

const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ff6786',
  },
};

const styles = StyleSheet.create({
  onBoardingContainer: {
    paddingHorizontal: '6%',
    paddingVertical: '10%',
  },
  headingContainer: {
    marginBottom: 20,
  },
  headingText: {
    textAlign: 'center',
    fontSize: 16,
  },
  textInputContainer: {
    marginVertical: 24,
  },
  continueButtonContainer: {
    marginTop: 26,
  },
});

const OnBoarding = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const { updatingProfileLoading } = useSelector(getUserProfileData);

  const disabledButton = useMemo(() => {
    return isNilOrEmpty(name);
  }, [name]);

  const handleUserProfileUpdate = useCallback(() => {
    dispatch(updateUserProfileRequest(name, email));
  }, [dispatch, email, name]);

  return (
    <SafeAreaView>
      <View style={styles.onBoardingContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Personal Details</Text>
        </View>

        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>
            Tell us a bit more about yourself
          </Text>
        </View>

        <View style={styles.textInputContainer}>
          <TextInput
            label="Name"
            autoCapitalize="words"
            autoCompleteType="name"
            value={name}
            selectionColor="#ff6786"
            theme={theme}
            onChangeText={(text: string) => setName(text)}
          />
        </View>

        <View style={styles.textInputContainer}>
          <TextInput
            label="Email"
            autoCapitalize="none"
            autoCompleteType="email"
            value={email}
            keyboardType="email-address"
            selectionColor="#ff6786"
            theme={theme}
            onChangeText={(text: string) => setEmail(text)}
          />
        </View>

        <View style={styles.continueButtonContainer}>
          <CustomButton
            type="secondary"
            text="Continue"
            disabled={disabledButton}
            loading={updatingProfileLoading}
            onPress={() => handleUserProfileUpdate()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnBoarding;
