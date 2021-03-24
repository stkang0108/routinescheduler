import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Todo from '../components/Todo';
import Diet from '../components/Diet';
import Lecture from '../components/Lecture';

const day = new Date();
const year = day.getFullYear();
const month =
  day.getMonth() + 1 < 10 ? '0' + (day.getMonth() + 1) : day.getMonth() + 1;
const date = day.getDate() < 10 ? '0' + day.getDate() : day.getDate();
const today = `${year}-${month}-${date}`;

const GET_SCHEDULES_AND_TODAYLECTURE = gql`
  query($name: String!) {
    getSchedule(name: $name) {
      date
      todo
      diet
    }
    getTodayLecture(name: $name) {
      id
      date
      time
      postedBy {
        name
      }
    }
  }
`;

export default function MainScreen() {
  const [user, setUser] = useState({});
  const [lecture, setLecture] = useState({});
  useEffect(() => {
    SecureStore.getItemAsync('Auth').then((Auth) => {
      setUser(JSON.parse(Auth).user);
    });
  }, []);
  const { loading, error, data } = useQuery(GET_SCHEDULES_AND_TODAYLECTURE, {
    variables: { name: user.name },
  });
  if (loading) return null;
  if (error) return 'Error! ${error}';

  const todaySchedule = new Object();
  const todayLecture = [];
  const allSchedules = data.getSchedule;
  const allLectures = data.getTodayLecture;
  for (let i = 0; i < allSchedules.length; i++) {
    if (allSchedules[i].date === today) {
      todaySchedule.todo = allSchedules[i].todo;
      todaySchedule.diet = allSchedules[i].diet;
    }
  }
  for (let j = 0; j < allLectures.length; j++) {
    if (allLectures[j].date === today) {
      lecture[today] = [];
      lecture[today].push({
        id: allLectures[j].id,
        time: allLectures[j].time,
        name: allLectures[j].postedBy.name,
      });
      todayLecture.push(lecture[today]);
    }
  }

  console.log(todayLecture.flat());

  return (
    <View style={styles.container}>
      <Text>{today}</Text>
      <Text>안녕하세요 {user.name} 님.</Text>
      {user.trainer !== 'trainer' ? (
        <View style={styles.contentsContainer}>
          <Todo contents={todaySchedule.todo} />
          <Diet food={todaySchedule.diet} />
        </View>
      ) : (
        <View style={styles.contentsContainer}>
          <Text style={styles.lectureText}>Lecture</Text>
          {todayLecture
            .flat()
            .sort(function (a, b) {
              return a['time'].replace(':', '') - b['time'].replace(':', '');
            })
            .map((lecture) => (
              <Lecture
                key={lecture.id}
                time={lecture.time}
                name={lecture.name}
              />
            ))}
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
    width: '100%',
    backgroundColor: '#807f75',
    height: '20%',
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
