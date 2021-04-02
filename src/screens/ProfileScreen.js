import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Updates from 'expo-updates';
import BoxButton from '../components/BoxButton';
import AddTrainer from '../components/AddTrainer';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState({});
  useEffect(() => {
    SecureStore.getItemAsync('Auth').then((Auth) => {
      setUser(JSON.parse(Auth).user);
    });
  }, []);

  const signoutButton = async () => {
    await SecureStore.deleteItemAsync('Auth');
    await Updates.reloadAsync();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text>{user.name}</Text>
        <AddTrainer user={user} />
        <BoxButton
          style={styles.button}
          title={'로그아웃'}
          onPress={signoutButton}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 15,
  },
});
