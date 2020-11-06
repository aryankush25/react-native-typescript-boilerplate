import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

interface CustomButtonTypes {
  text: string;
  disabled?: boolean;
  loading?: boolean;
  onPress: Function;
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 10,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '900',
  },
  disabled: {
    opacity: 0.8,
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  activityIndicatorContainer: {
    marginLeft: 10,
  },
});

const CustomButton = ({
  text,
  disabled = false,
  loading = false,
  onPress,
}: CustomButtonTypes) => {
  let touchableOpacityStyles: any = [styles.appButtonContainer];

  if (disabled || loading) {
    touchableOpacityStyles.push(styles.disabled);
  }

  return (
    <TouchableOpacity
      onPress={() => (!disabled || !loading) && onPress()}
      style={touchableOpacityStyles}
      activeOpacity={0.8}
      disabled={disabled || loading}>
      <View style={styles.innerContainer}>
        <Text style={styles.appButtonText}>{text}</Text>

        {loading && (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator color="white" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
