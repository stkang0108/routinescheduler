import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import BoxButton from '../components/BoxButton';
import { EDITLECTURE } from '../query_mutation';

export default function EditLectureScreen({ route }) {
  const { id, etime } = route.params;
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setShow(Platform.OS === 'ios');
    setTime(currentDate);
  };

  const [editLecture] = useMutation(EDITLECTURE);
  const lectureEdit = async () => {
    try {
      await editLecture({
        variables: { id, time: JSON.stringify(time + '09:00').slice(16, 22) },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.todoCont}>
        <Text>이전시간:{etime}</Text>
        <DateTimePicker
          testID='dateTimePicker'
          value={time}
          mode='time'
          local='ko-KR'
          display='spinner'
          onChange={onChange}
          style={{ width: '100%' }}
        />
        <Text>{JSON.stringify(time + '09:00').slice(16, 22)}</Text>
        <BoxButton
          style={styles.button}
          title={'수정하기'}
          onPress={lectureEdit}
        />
      </View>
    </View>
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
