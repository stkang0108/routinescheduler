import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export default function Input({ style, ...props }) {
  return <TextInput {...props} style={[styles.input, style]} />;
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#e6e6e6',
    width: '100%',
    borderRadius: 8,
    padding: 18,
  },
});
