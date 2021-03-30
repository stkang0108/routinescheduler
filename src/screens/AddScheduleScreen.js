import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Switch,
  Platform,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from '../components/Input';
import BoxButton from '../components/BoxButton';
import Todo from '../components/Todo';
import Diet from '../components/Diet';
import Lecture from '../components/Lecture';
import {
  ADDLECTURE,
  ADDSCHEDULE,
  DELETESCHEDULE,
  DELETELECTURE,
  GET_SCHEDULES_AND_LECTURE,
} from '../query_mutation';

export default function AddScheduleScreen({ route, navigation }) {
  const { date, name } = route.params;
  const [todo, setTodo] = useState('');
  const [diet, setDiet] = useState('');
  const [lecture, setLecture] = useState(false);
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const { loading, error, data } = useQuery(GET_SCHEDULES_AND_LECTURE, {
    variables: { name },
    pollInterval: 300,
  });
  if (loading) return null;
  if (error) return 'Error! ${error}';

  const selectedDaySchedule = new Object();
  const selectedDayLecture = new Object();
  const allSchedules = data.getSchedule;
  const allLectures = data.getLecture;
  for (let i = 0; i < allSchedules.length; i++) {
    if (allSchedules[i].date === date) {
      selectedDaySchedule.id = allSchedules[i].id;
      selectedDaySchedule.todo = allSchedules[i].todo;
      selectedDaySchedule.diet = allSchedules[i].diet;
    }
  }
  for (let j = 0; j < allLectures.length; j++) {
    if (allLectures[j].date === date) {
      selectedDayLecture.id = allLectures[j].id;
      selectedDayLecture.time = allLectures[j].time;
    }
  }

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

  const [deleteSchedule] = useMutation(DELETESCHEDULE);
  const scheduleDelete = async () => {
    try {
      await deleteSchedule({
        variables: { id: selectedDaySchedule.id },
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

  const [deleteLecture] = useMutation(DELETELECTURE);
  const lectureDelete = async () => {
    try {
      await deleteLecture({
        variables: { id: selectedDayLecture.id },
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
      {selectedDaySchedule.todo ? (
        <View style={styles.container}>
          <Text>{date}</Text>
          <View style={styles.contentsContainer}>
            <Todo contents={selectedDaySchedule.todo} />
            <Diet food={selectedDaySchedule.diet} />
            <View style={styles.buttonContatiner}>
              <BoxButton
                style={styles.button}
                title={'수정'}
                onPress={() => {
                  navigation.navigate('EDITS', {
                    id: selectedDaySchedule.id,
                    etodo: selectedDaySchedule.todo,
                    ediet: selectedDaySchedule.diet,
                  });
                }}
              />
              <BoxButton
                style={styles.button}
                title={'삭제'}
                onPress={scheduleDelete}
              />
            </View>
          </View>
        </View>
      ) : selectedDayLecture.time ? (
        <View style={styles.container}>
          <Text>{date}</Text>
          <Lecture time={selectedDayLecture.time} name={name} />
          <View style={styles.buttonContatiner}>
            <BoxButton
              style={styles.button}
              title={'수정'}
              onPress={() => {
                navigation.navigate('EDITL', {
                  id: selectedDayLecture.id,
                  etime: selectedDayLecture.time,
                });
              }}
            />
            <BoxButton
              style={styles.button}
              title={'삭제'}
              onPress={lectureDelete}
            />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            ios_backgroundColor='#3e3e3e'
            onValueChange={toggleSwitch}
            value={lecture}
          />
          {lecture ? (
            <View style={styles.contentContainer}>
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
            <View style={styles.contentContainer}>
              <Text> To Do.</Text>
              <Input
                style={{ maxHeight: '50%', paddingTop: 18 }}
                multiline={true}
                value={todo}
                onChangeText={setTodo}
              />
              <Text> Diet.</Text>
              <Input
                style={{ maxHeight: '40%', paddingTop: 18 }}
                multiline={true}
                value={diet}
                onChangeText={setDiet}
              />
              <BoxButton
                style={styles.button}
                title={'등록하기'}
                onPress={scheduleRegister}
              />
            </View>
          )}
        </View>
      )}
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
  contentContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  button: {
    marginTop: 20,
  },
  buttonContatiner: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
