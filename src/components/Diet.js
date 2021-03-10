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
    backgroundColor: '#807f75',
    height: '20%',
    width: '85%',
    marginTop: 20,
    padding: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
