import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Switch,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from '../components/Input';
import BoxButton from '../components/BoxButton';

const ADDSCHEDULE = gql`
  mutation addSchedule(
    $name: String!
    $date: String!
    $todo: String!
    $diet: String!
  ) {
    addSchedule(name: $name, date: $date, todo: $todo, diet: $diet)
  }
`;

const ADDLECTURE = gql`
  mutation addLecture($name: String!, $date: String!, $time: String!) {
    addLecture(name: $name, date: $date, time: $time)
  }
`;

export default function AddScheduleScreen({ route }) {
  const { date, name } = route.params;
  const [todo, setTodo] = useState('');
  const [diet, setDiet] = useState('');
  const [lecture, setLecture] = useState(false);
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [addSchedule] = useMutation(ADDSCHEDULE);
  const scheduleRegister = async () => {
    try {
      await addSchedule({
        variables: { name, todo, diet, date },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [addLecture] = useMutation(ADDLECTURE);
  const lectureRegister = async () => {
    try {
      await addLecture({
        variables: {
          name,
          date,
          time: JSON.stringify(time + '09:00').slice(16, 22),
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const toggleSwitch = () => setLecture((previousState) => !previousState);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setShow(Platform.OS === 'ios');
    setTime(currentDate);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          ios_backgroundColor='#3e3e3e'
          onValueChange={toggleSwitch}
          value={lecture}
        />
        {lecture ? (
          <View style={styles.todoCont}>
            <DateTimePicker
              testID='dateTimePicker'
              value={time}
              mode='time'
              local='ko-KR'
              display='spinner'
              onChange={onChange}
              style={{ width: '100%' }}
            />
            <Text>{date}</Text>
            <Text>{JSON.stringify(time + '09:00').slice(16, 22)}</Text>
            <BoxButton
              style={styles.button}
              title={'등록하기'}
              onPress={lectureRegister}
            />
          </View>
        ) : (
          <View style={styles.todoCont}>
            <Text> To Do.</Text>
            <Input
              placeholder={'Routine'}
              value={todo}
              onChangeText={setTodo}
            />
            <Text> Diet.</Text>
            <Input placeholder={'Diet'} value={diet} onChangeText={setDiet} />
            <BoxButton
              style={styles.button}
              title={'등록하기'}
              onPress={scheduleRegister}
            />
          </View>
        )}
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
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  button: {
    marginTop: 20,
  },
});
