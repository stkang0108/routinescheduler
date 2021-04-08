import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Todo from '../components/Todo';
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
    <ImageBackground
      source={{ uri: 'https://ifh.cc/g/DQYAOf.jpg' }}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.inner1}>
          <Text style={styles.text}>
            {year}년 {month}월 {date}일
          </Text>
          <Text style={styles.text}>안녕하세요 {user.name} 회원님.</Text>
        </View>
        <View style={styles.inner2}>
          {todaySchedule.todo ? (
            <View style={styles.contentsContainer}>
              <Todo contents={todaySchedule.todo} />
            </View>
          ) : todayLecture.time ? (
            <View style={styles.contentsContainer}>
              <Lecture
                time={todayLecture.time}
                name={user.name}
                trainer={user.trainer}
              />
            </View>
          ) : (
            <View style={styles.contentsContainer}>
              <Text>등록된 일정이 없습니다.</Text>
            </View>
          )}
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
    paddingHorizontal: 40,
    paddingTop: 100,
  },
  inner2: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentsContainer: {
    backgroundColor: '#fff',
    minHeight: '45%',
    width: '80%',
    paddingVertical: 10,
    paddingHorizontal: 35,
    marginBottom: 30,
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
