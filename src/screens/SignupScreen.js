import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ImageBackground,
} from 'react-native';
import Input from '../components/Input';
import BoxButton from '../components/BoxButton';
import IconButton from '../components/IconButton';
import Error from '../components/Error';
import { SIGNUP } from '../query_mutation';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');
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
          setError('작성해주신 비밀번호가 다릅니다, 다시 한번 확인해 주세요. ');
        } else {
          const { data } = await signup({
            variables: { email, name, password },
          });
          if (data.signup) {
            welcomeAlert();
          }
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const welcomeAlert = () =>
    Alert.alert(
      '회원가입이 완료되었습니다.',
      '이전 페이지에서 로그인 부탁드리겠습니다.',
      [{ text: '확인', onPress: () => navigation.pop() }],
      { cancelable: false }
    );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    >
      <ImageBackground
        source={{ uri: 'https://ifh.cc/g/vEnVKW.jpg' }}
        style={styles.image}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <IconButton
              style={styles.iconButton}
              name={'ios-close-circle-outline'}
              size={30}
              color='#ff7420'
              onPress={() => {
                navigation.pop();
              }}
            />
            <Error error={error} />
            <Input
              style={styles.input}
              placeholder={'이름'}
              value={name}
              onChangeText={setName}
            />
            <Input
              style={styles.input}
              placeholder={'아이디'}
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
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  inner: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: '#ff7420',
    borderWidth: 2,
    marginTop: 15,
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
