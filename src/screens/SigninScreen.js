import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Heading from '../components/Heading';
import Input from '../components/Input';
import BoxButton from '../components/BoxButton';
import TextButton from '../components/TextButton';

const SIGNIN = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
      user {
        email
        name
        trainer
      }
    }
  }
`;

export default function SigninScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      console.log(err);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Heading style={styles.title}>LOG IN</Heading>
        <Input
          style={styles.input}
          placeholder={'이메일'}
          keyboardType={'email-address'}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          style={styles.input}
          placeholder={'비밀번호'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <BoxButton
          title={'로그인'}
          style={styles.signinBtn}
          onPress={signinButton}
        />
        <TextButton
          title={'새로운 계정 만들기'}
          style={styles.signupBtn}
          onPress={() => {
            navigation.navigate('SIGNUP');
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
    alignItems: 'center',
  },
  title: {
    marginBottom: 35,
  },
  input: {
    marginVertical: 8,
  },
  signinBtn: {
    marginTop: 30,
  },
  signupBtn: {
    marginTop: 10,
  },
});
