import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { View, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Updates from 'expo-updates';
import BoxButton from './BoxButton';
import Input from './Input';
import Error from './Error';
import { ADDTRAINER } from '../query_mutation';

export default function AddTrainer({ user }) {
  const email = user.email;
  const [trainer, setTrainer] = useState('');
  const [error, setError] = useState('');
  const [addTrianer, { data }] = useMutation(ADDTRAINER);
  const addButton = async () => {
    try {
      if (email !== '' && trainer !== '') {
        await addTrianer({
          variables: { email, trainer },
        });
      }
      await SecureStore.deleteItemAsync('Auth');
      await Updates.reloadAsync();
    } catch (err) {
      setError(err.message);
    }
  };

  const addTrainerAlert = () =>
    Alert.alert(
      '트레이너를 등록합니다.',
      `${trainer} 트레이너가 맞습니까?`,
      [
        { text: '확인', onPress: () => confirmAlert() },
        { text: '아니요', style: 'cancel' },
      ],
      { cancelable: false }
    );

  const confirmAlert = () =>
    Alert.alert(
      '앱이 재실행 될 예정입니다.',
      '정상적으로 트레이너가 등록될 시 재로그인 부탁드리겠습니다.',
      [{ text: '확인', onPress: () => addButton() }],
      { cancelable: false }
    );

  if (user.trainer !== 'trainer' && user.trainer === '') {
    return (
      <View style={styles.container}>
        <Error error={error} />
        <Input
          style={{ marginTop: 10 }}
          placeholder={'트레이너 이름'}
          value={trainer}
          onChangeText={setTrainer}
        />
        <BoxButton
          title={'트레이너 연결하기'}
          style={styles.button}
          onPress={addTrainerAlert}
        />
      </View>
    );
  }
  return <View />;
}

const styles = StyleSheet.create({
  container: {
    minHeight: '25%',
    width: '85%',
    paddingHorizontal: 30,
    paddingBottom: 30,
    borderColor: '#ff7420',
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
});
