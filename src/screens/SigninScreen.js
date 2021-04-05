import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import Input from '../components/Input';
import BoxButton from '../components/BoxButton';
import TextButton from '../components/TextButton';
import Error from '../components/Error';
import { SIGNIN } from '../query_mutation';

export default function SigninScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [signin, { data }] = useMutation(SIGNIN);

  const signinButton = async () => {
    try {
      if (email !== '' && password !== '') {
        const { data } = await signin({ variables: { email, password } });
        if (data) {
          await SecureStore.setItemAsync('Auth', JSON.stringify(data.signin));
          navigation.reset({ routes: [{ name: 'MAIN' }] });
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Image
            style={{ width: 300, height: 300 }}
            source={{ uri: 'https://ifh.cc/g/ksZZ8D.jpg' }}
            resizeMode='stretch'
          />
          <Input
            style={{ borderColor: '#ff7420', borderWidth: 2 }}
            placeholder={'아이디'}
            keyboardType={'default'}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            style={{ borderColor: '#ff7420', borderWidth: 2, marginTop: 15 }}
            placeholder={'비밀번호'}
            keyboardType={'default'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Error error={error} />
          <BoxButton
            style={styles.signinBtn}
            title={'로그인'}
            onPress={signinButton}
          />
          <TextButton
            style={styles.signupBtn}
            title={'새로운 계정 만들기'}
            onPress={() => {
              navigation.navigate('SIGNUP');
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signinBtn: {
    marginTop: 10,
  },
  signupBtn: {
    marginTop: 10,
  },
});
