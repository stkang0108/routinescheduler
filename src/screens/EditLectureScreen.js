import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { StyleSheet, Text, View, Alert, ImageBackground } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import BoxButton from '../components/BoxButton';
import IconButton from '../components/IconButton';
import { EDITLECTURE } from '../query_mutation';

export default function EditLectureScreen({ route, navigation }) {
  const { id, etime, date } = route.params;
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setShow(Platform.OS === 'ios');
    setTime(currentDate);
  };

  const [editLecture] = useMutation(EDITLECTURE);
  const editLectureAlert = () =>
    Alert.alert(
      '수업시간을 수정하시겠습니까?',
      `${JSON.stringify(time + '09:00').slice(16, 22)} 으로 수정합니다`,
      [
        { text: '확인', onPress: () => lectureEdit() },
        { text: '취소', style: 'cancel' },
      ],
      { cancelable: false }
    );
  const lectureEdit = async () => {
    try {
      await editLecture({
        variables: { id, time: JSON.stringify(time + '09:00').slice(16, 22) },
      });
      await navigation.navigate('MCAL');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://ifh.cc/g/TWShOt.jpg' }}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.inner1}>
          <IconButton
            style={styles.iconButton}
            name={'ios-close-circle-outline'}
            size={30}
            color='#ff7420'
            onPress={() => {
              navigation.pop();
            }}
          />
          <Text style={styles.suggestText}>
            회원님의 수업시간을 수정해주세요.
          </Text>
          <Text style={styles.timeText}>
            이전시간: {date.slice(5)} {etime}
          </Text>
        </View>
        <View style={styles.inner2}>
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
          <BoxButton title={'수정하기'} onPress={editLectureAlert} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner1: {
    height: '30%',
    marginTop: 20,
    paddingTop: 130,
    paddingHorizontal: 40,
  },
  inner2: {
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
  suggestText: {
    fontSize: 22,
    fontWeight: '900',
  },
  timeText: {
    fontSize: 18,
    fontWeight: '700',
  },
  iconButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
});
