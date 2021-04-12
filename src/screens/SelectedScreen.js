import React from 'react';
import { useQuery } from '@apollo/client';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { GET_SCHEDULES_AND_LECTURE } from '../query_mutation';
import Todo from '../components/Todo';
import Lecture from '../components/Lecture';

export default function SelectedScreen({ route }) {
  const { date, name } = route.params;
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
      selectedDaySchedule.todo = allSchedules[i].todo;
    }
  }
  for (let j = 0; j < allLectures.length; j++) {
    if (allLectures[j].date === date) {
      selectedDayLecture.time = allLectures[j].time;
    }
  }
  return (
    <ImageBackground
      source={{ uri: 'https://ifh.cc/g/TWShOt.jpg' }}
      style={{ flex: 1 }}
    >
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
          </View>
        </View>
      ) : selectedDayLecture.time ? (
        <View style={styles.container}>
          <View style={styles.inner1}>
            <Text style={styles.text}>{date}</Text>
            <Text style={styles.text}>{name} 회원님의 수업 시간입니다.</Text>
          </View>
          <View style={styles.inner2}>
            <View style={styles.contentsContainer}>
              <Lecture time={selectedDayLecture.time} name={name} />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.inner1}>
            <Text style={styles.text}>{date}</Text>
            <Text style={styles.text}>등록된 일정이 없습니다.</Text>
          </View>
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  text: {
    fontSize: 22,
    fontWeight: '900',
  },
});
