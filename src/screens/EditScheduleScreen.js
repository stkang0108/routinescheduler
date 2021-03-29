import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { EDITSCHEDULE } from '../query_mutation';
import Input from '../components/Input';
import BoxButton from '../components/BoxButton';

export default function EditScheduleScreen({ route }) {
  const { id, etodo, ediet } = route.params;
  const [todo, setTodo] = useState('');
  const [diet, setDiet] = useState('');

  const [editSchedule] = useMutation(EDITSCHEDULE);
  const scheduleEdit = async () => {
    try {
      await editSchedule({
        variables: { id, todo, diet },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.todoCont}>
          <Text> To Do.</Text>
          <Input placeholder={etodo} value={todo} onChangeText={setTodo} />
          <Text> Diet.</Text>
          <Input placeholder={ediet} value={diet} onChangeText={setDiet} />
          <BoxButton
            style={styles.button}
            title={'수정하기'}
            onPress={scheduleEdit}
          />
        </View>
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
  todoCont: {
    flex: 1,
    width: '80%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
  },
});
