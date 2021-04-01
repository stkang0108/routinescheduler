import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Todo from '../components/Todo';
import Diet from '../components/Diet';
import Lecture from '../components/Lecture';
import { GET_SCHEDULES_AND_LECTURE } from '../query_mutation';

const day = new Date();
const year = day.getFullYear();
const month =
  day.getMonth() + 1 < 10 ? '0' + (day.getMonth() + 1) : day.getMonth() + 1;
const date = day.getDate() < 10 ? '0' + day.getDate() : day.getDate();
const today = `${year}-${month}-${date}`;

export default function MemberHomeScreen() {
  const [user, setUser] = useState({});
  useEffect(() => {
    SecureStore.getItemAsync('Auth').then((Auth) => {
      setUser(JSON.parse(Auth).user);
    });
  }, []);
  const { loading, error, data } = useQuery(GET_SCHEDULES_AND_LECTURE, {
    variables: { name: user.name },
    pollInterval: 300,
  });
  if (loading) return null;
  if (error) return 'Error! ${error}';

  const todaySchedule = new Object();
  const todayLecture = new Object();
  const allSchedules = data.getSchedule;
  const allLectures = data.getLecture;

  for (let i = 0; i < allSchedules.length; i++) {
    if (allSchedules[i].date === today) {
      todaySchedule.todo = allSchedules[i].todo;
      todaySchedule.diet = allSchedules[i].diet;
    }
  }
  for (let j = 0; j < allLectures.length; j++) {
    if (allLectures[j].date === today) {
      todayLecture.time = allLectures[j].time;
    }
  }

  return (
    <View style={styles.container}>
      <Text>{today}</Text>
      <Text>안녕하세요 {user.name} 님.</Text>
      {todaySchedule.todo ? (
        <View style={styles.contentsContainer}>
          <Todo contents={todaySchedule.todo} />
          <Diet food={todaySchedule.diet} />
        </View>
      ) : todayLecture.time ? (
        <View style={styles.contentsContainer}>
          <Lecture time={todayLecture.time} name={user.name} />
        </View>
      ) : (
        <View style={styles.contentsContainer}>
          <Text>등록된 일정이 없습니다.</Text>
        </View>
      )}
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
  contentsContainer: {
    backgroundColor: '#807f75',
    height: '40%',
    width: '85%',
    marginTop: 20,
    padding: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lectureText: {
    marginBottom: 10,
  },
});
