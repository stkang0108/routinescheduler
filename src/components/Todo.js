import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default function ToDo({ contents, style }) {
  return (
    <View style={[style, styles.container]}>
      <Text>ToDo</Text>
      <Text>{contents}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
