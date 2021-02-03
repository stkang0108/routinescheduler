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
import IconButton from '../components/IconButton';

export default function SignupScreen({ navigation }) {
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
        <Input style={styles.input} placeholder={'이름'} />
        <Input
          style={styles.input}
          placeholder={'Email'}
          keyboardType={'email-address'}
        />
        <Input style={styles.input} placeholder={'Password'} secureTextEntry />
        <BoxButton
          title={'회원가입'}
          style={styles.signupButton}
          onPress={() => {}}
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
  signupButton: {
    marginTop: 20,
  },
  iconButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
});
