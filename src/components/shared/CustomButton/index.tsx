import React, { useMemo } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

interface CustomButtonTypes {
  type?: 'primary' | 'secondary';
  text: string;
  disabled?: boolean;
  loading?: boolean;
  onPress: Function;
}

const getStyleSheet = (disabled: boolean, type: 'primary' | 'secondary') => {
  return StyleSheet.create({
    appButtonContainer: {
      backgroundColor: disabled
        ? '#e6e3e6'
        : type === 'secondary'
        ? '#ff6786'
        : 'black',
      borderRadius: 10,
      paddingVertical: 14,
    },
    innerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    buttonTextContainer: {
      marginLeft: 10,
      flex: 1,
    },
    buttonText: {
      fontSize: 18,
      color: disabled ? '#bcbbbc' : '#fff',
      fontWeight: '900',
      width: '100%',
      textAlign: 'center',
    },
    activityIndicatorContainer: {
      position: 'absolute',
      right: 20,
    },
  });
};

const CustomButton = ({
  type = 'primary',
  text,
  disabled = false,
  loading = false,
  onPress,
}: CustomButtonTypes) => {
  const styles = useMemo(() => {
    return getStyleSheet(disabled || loading, type);
  }, [disabled, loading, type]);

  return (
    <TouchableOpacity
      onPress={() => (!disabled || !loading) && onPress()}
      style={styles.appButtonContainer}
      activeOpacity={0.8}
      disabled={disabled || loading}>
      <View style={styles.innerContainer}>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonText}>{text}</Text>
        </View>

        {loading && (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator color="#8f8d8f" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
