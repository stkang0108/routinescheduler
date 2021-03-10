import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default function ToDo({ contents }) {
  return (
    <View style={styles.container}>
      <Text>ToDo</Text>
      <Text>{contents}</Text>
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
