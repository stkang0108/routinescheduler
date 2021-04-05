import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

export default function Input({ style, ...props }) {
  return <TextInput {...props} style={[styles.input, style]} />;
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f2f2f2',
    width: '100%',
    borderRadius: 8,
    padding: 18,
  },
});
