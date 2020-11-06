import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import ImageContainer from '../../container/ImageContainer';
import { PICKLED_BLUEWOOD } from '../../styles/colorConstants';

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    justifyContent: 'flex-end',
    height: '100%',
    paddingBottom: '20%',
  },
});

const Home = () => {
  return (
    <ImageContainer>
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size="large" color={PICKLED_BLUEWOOD} />
      </View>
    </ImageContainer>
  );
};

export default Home;
