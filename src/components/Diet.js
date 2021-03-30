import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default function Diet({ food }) {
  return (
    <View style={styles.container}>
      <Text>Diet</Text>
      <Text>{food}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
