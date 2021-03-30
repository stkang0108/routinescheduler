import React from 'react';
import { useQuery } from '@apollo/client';
import { StyleSheet, Text, View } from 'react-native';
import { GET_SCHEDULES_AND_LECTURE } from '../query_mutation';
import Todo from '../components/Todo';
import Diet from '../components/Diet';
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
      selectedDaySchedule.diet = allSchedules[i].diet;
    }
  }
  for (let j = 0; j < allLectures.length; j++) {
    if (allLectures[j].date === date) {
      selectedDayLecture.time = allLectures[j].time;
    }
  }
  return (
    <>
      {selectedDaySchedule.todo ? (
        <View style={styles.container}>
          <Text>{date}</Text>
          <Text>안녕하세요 {name} 님.</Text>
          <Todo contents={selectedDaySchedule.todo} />
          <Diet food={selectedDaySchedule.diet} />
        </View>
      ) : selectedDayLecture.time ? (
        <View style={styles.container}>
          <Text>{date}</Text>
          <Lecture time={selectedDayLecture.time} name={name} />
        </View>
      ) : (
        <View style={styles.container}>
          <Text>등록된 일정이 없습니다.</Text>
        </View>
      )}
    </>
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
