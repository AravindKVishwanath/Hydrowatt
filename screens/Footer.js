import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View></View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'lightgray', // Set your preferred background color
    alignItems: 'center',
    justifyContent: 'center',
    height: 50, // Set the desired height for your footer
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Footer;
