import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Input from '../components/Input';
import BoxButton from '../components/BoxButton';

const ADDSCHEDULE = gql`
  mutation addSchedule(
    $email: String!
    $date: String!
    $todo: String!
    $diet: String!
  ) {
    addSchedule(email: $email, date: $date, todo: $todo, diet: $diet)
  }
`;

export default function AddScheduleScreen({ route }) {
  const { date, email } = route.params;
  const [todo, setTodo] = useState('');
  const [diet, setDiet] = useState('');
  const [addSchedule, { data }] = useMutation(ADDSCHEDULE);
  const registerButton = async () => {
    try {
      await addSchedule({
        variables: { email, todo, diet, date },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text> To Do.</Text>
        <Input placeholder={'Routine'} value={todo} onChangeText={setTodo} />
        <Text> Diet.</Text>
        <Input placeholder={'Diet'} value={diet} onChangeText={setDiet} />
        <BoxButton title={'등록하기'} onPress={registerButton} />
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
});
