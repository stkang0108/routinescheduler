import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { View, StyleSheet } from 'react-native';
import BoxButton from './BoxButton';
import Input from './Input';

const ADDTRAINER = gql`
  mutation addTrainer($email: String!, $trainer: String!) {
    addTrainer(email: $email, trainer: $trainer)
  }
`;

export default function AddTrainer({ user }) {
  const email = user.email;
  const [trainer, setTrainer] = useState('');
  const [addTrianer, { data }] = useMutation(ADDTRAINER);
  const addButton = async () => {
    try {
      if (email !== '' && trainer !== '') {
        await addTrianer({
          variables: { email, trainer },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  if (user.trainer !== 'trainer' && user.trainer === '') {
    return (
      <View style={styles.container}>
        <Input
          style={styles.input}
          placeholder={'트레이너 이름'}
          value={trainer}
          onChangeText={setTrainer}
        />
        <BoxButton
          title={'트레이너 연결하기'}
          style={styles.button}
          onPress={addButton}
        />
      </View>
    );
  }
  return <View />;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#807f75',
    height: '30%',
    width: '85%',
    marginTop: 20,
    padding: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
});
