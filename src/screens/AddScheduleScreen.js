import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Switch,
  ImageBackground,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from '../components/Input';
import BoxButton from '../components/BoxButton';
import Todo from '../components/Todo';
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
  const [lecture, setLecture] = useState(false);
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const { loading, error, data } = useQuery(GET_SCHEDULES_AND_LECTURE, {
    variables: { name },
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
    }
  }
  for (let j = 0; j < allLectures.length; j++) {
    if (allLectures[j].date === date) {
      selectedDayLecture.id = allLectures[j].id;
      selectedDayLecture.time = allLectures[j].time;
    }
  }

  const [addSchedule] = useMutation(ADDSCHEDULE);
  const addScheduleAlert = () =>
    Alert.alert(
      '스케줄을 등록합니다.',
      '',
      [
        { text: '확인', onPress: () => scheduleRegister() },
        { text: '취소', style: 'cancel' },
      ],
      { cancelable: false }
    );
  const scheduleRegister = async () => {
    try {
      await addSchedule({
        variables: { name, todo, date },
      });
      await navigation.navigate('MCAL');
    } catch (err) {
      console.log(err);
    }
  };

  const [deleteSchedule] = useMutation(DELETESCHEDULE);
  const deleteScheduleAlert = () =>
    Alert.alert(
      '스케줄을 삭제합니다.',
      '',
      [
        { text: '확인', onPress: () => scheduleDelete() },
        { text: '취소', style: 'cancel' },
      ],
      { cancelable: false }
    );
  const scheduleDelete = async () => {
    try {
      await deleteSchedule({
        variables: { id: selectedDaySchedule.id },
      });
      await navigation.navigate('MCAL');
    } catch (err) {
      console.log(err);
    }
  };

  const [addLecture] = useMutation(ADDLECTURE);
  const addLectureAlert = () =>
    Alert.alert(
      '수업시간을 등록합니다.',
      `${date} ${JSON.stringify(time + '09:00').slice(16, 22)} 맞습니까?`,
      [
        { text: '확인', onPress: () => lectureRegister() },
        { text: '취소', style: 'cancel' },
      ],
      { cancelable: false }
    );
  const lectureRegister = async () => {
    try {
      await addLecture({
        variables: {
          name,
          date,
          time: JSON.stringify(time + '09:00').slice(16, 22),
        },
      });
      await navigation.navigate('MCAL');
    } catch (err) {
      console.log(err);
    }
  };

  const [deleteLecture] = useMutation(DELETELECTURE);
  const deleteLectureAlert = () =>
    Alert.alert(
      '스케줄을 삭제합니다.',
      '',
      [
        { text: '확인', onPress: () => lectureDelete() },
        { text: '취소', style: 'cancel' },
      ],
      { cancelable: false }
    );
  const lectureDelete = async () => {
    try {
      await deleteLecture({
        variables: { id: selectedDayLecture.id },
      });
      await navigation.navigate('MCAL');
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    >
      <ImageBackground
        source={{ uri: 'https://ifh.cc/g/7wrxPV.jpg' }}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {selectedDaySchedule.todo ? (
            <View style={styles.container}>
              <View style={styles.inner1}>
                <Text style={styles.text}>{date}</Text>
                <Text style={styles.text}>{name} 회원님의 스케줄입니다.</Text>
              </View>
              <View style={styles.inner2}>
                <View style={styles.contentsContainer}>
                  <Todo contents={selectedDaySchedule.todo} />
                </View>
                <View style={styles.buttonContatiner}>
                  <BoxButton
                    style={styles.button}
                    title={'수정'}
                    onPress={() => {
                      navigation.navigate('EDITS', {
                        id: selectedDaySchedule.id,
                        etodo: selectedDaySchedule.todo,
                      });
                    }}
                  />
                  <BoxButton
                    style={styles.button}
                    title={'삭제'}
                    onPress={deleteScheduleAlert}
                  />
                </View>
              </View>
            </View>
          ) : selectedDayLecture.time ? (
            <View style={styles.container}>
              <View style={styles.inner1}>
                <Text style={styles.text}>{date}</Text>
                <Text style={styles.text}>{name} 회원님의 스케줄입니다.</Text>
              </View>
              <View style={styles.inner2}>
                <View style={styles.contentsContainer}>
                  <Lecture time={selectedDayLecture.time} name={name} />
                </View>
                <View style={styles.buttonContatiner}>
                  <BoxButton
                    style={styles.button}
                    title={'수정'}
                    onPress={() => {
                      navigation.navigate('EDITL', {
                        id: selectedDayLecture.id,
                        etime: selectedDayLecture.time,
                        date,
                      });
                    }}
                  />
                  <BoxButton
                    style={styles.button}
                    title={'삭제'}
                    onPress={deleteLectureAlert}
                  />
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.container}>
              <View style={styles.inner1}>
                <Text style={styles.text}>{date}</Text>
                <Text style={styles.text}>{name} 회원님의 스케줄입니다.</Text>
              </View>
              <View style={styles.switchContainer}>
                <Text style={styles.question}>수업이 예정되어 있나요?</Text>
                <Switch
                  trackColor={{ false: '#767577', true: '#ff7420' }}
                  ios_backgroundColor='#3e3e3e'
                  onValueChange={toggleSwitch}
                  value={lecture}
                />
              </View>
              <View style={styles.inner2}>
                {lecture ? (
                  <>
                    <View style={styles.contentsContainer}>
                      <DateTimePicker
                        testID='dateTimePicker'
                        value={time}
                        mode='time'
                        local='ko-KR'
                        display='spinner'
                        onChange={onChange}
                        style={{ width: '100%' }}
                      />
                    </View>
                    <BoxButton
                      style={styles.button}
                      title={'등록하기'}
                      onPress={addLectureAlert}
                    />
                  </>
                ) : (
                  <>
                    <View style={styles.contentsContainer}>
                      <Text style={styles.suggest}>
                        회원님의 스케줄을 작성해주세요.
                      </Text>
                      <Input
                        style={{
                          minHeight: '25%',
                          paddingTop: 18,
                        }}
                        multiline={true}
                        value={todo}
                        onChangeText={setTodo}
                      />
                    </View>
                    <BoxButton
                      style={styles.button}
                      title={'등록하기'}
                      onPress={addScheduleAlert}
                    />
                  </>
                )}
              </View>
            </View>
          )}
        </TouchableWithoutFeedback>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  switchContainer: {
    minHeight: '5%',
    backgroundColor: '#ff7420',
    marginBottom: 15,
    paddingHorizontal: 35,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inner1: {
    minHeight: '30%',
    marginTop: 20,
    paddingHorizontal: 40,
    paddingTop: 100,
  },
  inner2: {
    minHeight: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentsContainer: {
    backgroundColor: '#fff',
    width: '85%',
    minHeight: '40%',
    paddingVertical: 10,
    paddingHorizontal: 35,
    marginBottom: 15,
    borderRadius: 20,
    borderColor: '#ff7420',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContatiner: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 22,
    fontWeight: '900',
  },
  question: {
    fontSize: 20,
    fontWeight: '900',
    color: '#3e3e3e',
  },
  suggest: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 10,
  },
});
