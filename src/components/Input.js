import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export default function Input({ style, ...props }) {
  return <TextInput {...props} style={[styles.input, style]} />;
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#e5dada',
    width: '100%',
    padding: 20,
    borderRadius: 8,
  },
});
