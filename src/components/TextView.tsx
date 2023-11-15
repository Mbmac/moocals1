import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';

interface CustomTextProps {
  text: string | undefined | number;
  style?: StyleProp<TextStyle>;
}

export const TextView = (props: CustomTextProps): JSX.Element => {
  const {style, text} = props;
  return <Text style={[styles.style, style]}>{text}</Text>;
};

const styles = StyleSheet.create({
  style: {
    fontSize: 20,
    color: '#000000',
    fontFamily: 'Poppins-Regular',
  },
});
