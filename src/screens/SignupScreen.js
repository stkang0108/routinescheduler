import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
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
import IconButton from '../components/IconButton';

const SIGNUP = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name)
  }
`;

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [signup, { data }] = useMutation(SIGNUP);

  const signupButton = async () => {
    try {
      if (
        email !== '' &&
        password !== '' &&
        confirmPass !== '' &&
        name !== ''
      ) {
        if (password !== confirmPass) {
          confirmPassErrAlert();
        } else {
          const { data } = await signup({
            variables: { email, name, password },
          });
          if (data.signup) {
            welcomeAlert();
          }
        }
      }
    } catch (error) {
      overlapAlert();
    }
  };

  const overlapAlert = () =>
    Alert.alert(
      '이메일 중복 오류',
      '작성하신 이메일 주소가 이미 존재합니다.',
      [{ text: '확인', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );

  const confirmPassErrAlert = () =>
    Alert.alert(
      '비밀번호를 확인해 주세요',
      '',
      [{ text: '확인', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );

  const welcomeAlert = () =>
    Alert.alert(
      '회원가입이 완료되었습니다!',
      '',
      [{ text: '확인', onPress: () => navigation.pop() }],
      { cancelable: false }
    );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Heading style={styles.title}>SIGN UP</Heading>
        <IconButton
          style={styles.iconButton}
          name={'ios-close-circle-outline'}
          size={30}
          color='#224bfe'
          onPress={() => {
            navigation.pop();
          }}
        />
        <Input
          style={styles.input}
          placeholder={'이름'}
          value={name}
          onChangeText={setName}
        />
        <Input
          style={styles.input}
          placeholder={'이메일@example.com'}
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
        <Input
          style={styles.input}
          placeholder={'비밀번호 확인'}
          value={confirmPass}
          onChangeText={setConfirmPass}
          secureTextEntry
        />
        <BoxButton
          title={'회원가입'}
          style={styles.signupBtn}
          onPress={signupButton}
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
  signupBtn: {
    marginTop: 20,
  },
  iconButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
});
