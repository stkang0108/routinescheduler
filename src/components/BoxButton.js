import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function FilledButton({ title, style, onPress }) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#224bfe',
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontWeight: '400',
    fontSize: 17,
  },
});
