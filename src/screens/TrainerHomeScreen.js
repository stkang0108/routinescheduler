import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { GET_TODAYLECTURE } from '../query_mutation';
import Lecture from '../components/Lecture';
import BoxButton from '../components/BoxButton';

const day = new Date();
const year = day.getFullYear();
const month =
  day.getMonth() + 1 < 10 ? '0' + (day.getMonth() + 1) : day.getMonth() + 1;
const date = day.getDate() < 10 ? '0' + day.getDate() : day.getDate();
const today = `${year}-${month}-${date}`;

export default function TrainerHomeScreen({ navigation }) {
  const [user, setUser] = useState({});
  useEffect(() => {
    SecureStore.getItemAsync('Auth').then((Auth) => {
      setUser(JSON.parse(Auth).user);
    });
  }, []);
  const { loading, error, data } = useQuery(GET_TODAYLECTURE, {
    variables: { name: user.name },
    pollInterval: 100,
  });
  if (loading) return null;
  if (error) return 'Error! ${error}';

  const todayLecture = [];
  const allLectures = data.getTodayLecture;
  for (let j = 0; j < allLectures.length; j++) {
    if (allLectures[j].date === today) {
      todayLecture.push({
        id: allLectures[j].id,
        time: allLectures[j].time,
        name: allLectures[j].postedBy.name,
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text>{today}</Text>
      <Text>안녕하세요 {user.name} 님.</Text>
      {todayLecture.length !== 0 ? (
        <View style={styles.contentsContainer}>
          <Text style={styles.lectureText}>Lecture</Text>
          {todayLecture
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
      ) : (
        <View style={styles.contentsContainer}>
          <Text>오늘 일정이 없습니다.</Text>
        </View>
      )}
      <BoxButton
        style={styles.button}
        title={'일정표'}
        onPress={() => {
          navigation.navigate('TCAL', {
            data: allLectures,
          });
        }}
      />
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
    minHeight: '28%',
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
  button: {
    marginTop: 20,
  },
});
