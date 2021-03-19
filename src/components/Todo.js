import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default function ToDo({ contents }) {
  return (
    <View>
      <Text>ToDo</Text>
      <Text>{contents}</Text>
    </View>
  );
}
