import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Updates from 'expo-updates';
import BoxButton from '../components/BoxButton';
import AddTrainer from '../components/AddTrainer';

export default function ProfileScreen() {
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Image
            style={{ width: 300, height: 150 }}
            source={{ uri: 'https://ifh.cc/g/XnDVs3.png' }}
            resizeMode='stretch'
          />
          {user.trainer !== 'trainer' ? (
            <Text style={styles.text}>안녕하세요 {user.name} 회원님</Text>
          ) : (
            <Text style={styles.text}>안녕하세요 {user.name} 트레이너님</Text>
          )}

          <AddTrainer user={user} />
          <BoxButton
            style={{ marginTop: 20 }}
            title={'로그아웃'}
            onPress={signoutButton}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 20,
    fontSize: 25,
    fontWeight: 'bold',
  },
});
