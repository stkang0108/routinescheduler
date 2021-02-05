import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import BoxButton from '../components/BoxButton';

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <Text>MainScreen</Text>
      <BoxButton
        title={'로그아웃'}
        style={styles.signoutBtn}
        onPress={() => {
          SecureStore.deleteItemAsync('token');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signoutBtn: {
    marginTop: 20,
  },
});
