import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Lecture({ time, name }) {
  return (
    <View style={styles.container}>
      <Text>{time}</Text>
      <Text>{name} 회원님</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '55%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
