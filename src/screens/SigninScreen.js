import React from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Heading from '../components/Heading';
import Input from '../components/Input';
import BoxButton from '../components/BoxButton';
import TextButton from '../components/TextButton';

export default function SigninScreen({ navigation }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Heading style={styles.title}>LOG IN</Heading>
        <Input
          style={styles.input}
          placeholder={'Email'}
          keyboardType={'email-address'}
        />
        <Input style={styles.input} placeholder={'Password'} secureTextEntry />
        <BoxButton
          title={'로그인'}
          style={styles.signinButton}
          onPress={() => {}}
        />
        <TextButton
          title={'새로운 계정 만들기'}
          style={styles.signupButton}
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
  signinButton: {
    marginTop: 30,
  },
  signupButton: {
    marginTop: 10,
  },
});
