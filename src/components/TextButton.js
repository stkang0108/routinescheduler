import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TextButton({ title, style, onPress }) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    color: '#224bfe',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
