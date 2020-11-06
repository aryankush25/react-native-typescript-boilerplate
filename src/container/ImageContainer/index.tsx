import React, { ReactNode } from 'react';
import { SafeAreaView, ImageBackground, StyleSheet } from 'react-native';
import bgImage from '../../assets/images/background-image.jpg';

interface ImageContainerTypes {
  children: ReactNode;
}

const styles = StyleSheet.create({
  image: {
    height: '100%',
  },
});

const ImageContainer = ({ children }: ImageContainerTypes) => {
  return (
    <ImageBackground source={bgImage} style={styles.image}>
      <SafeAreaView>{children}</SafeAreaView>
    </ImageBackground>
  );
};

export default ImageContainer;
