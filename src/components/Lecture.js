import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Lecture({ time, name, trainer }) {
  console.log(trainer);
  return (
    <>
      {trainer === 'trainer' ? (
        <View style={styles.container}>
          <Text style={styles.text}>{time}</Text>
          <Text style={styles.text}>{name} 회원님</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.text}>{time}</Text>
          <Text style={styles.text}>수업입니다.</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '70%',
    marginBottom: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
