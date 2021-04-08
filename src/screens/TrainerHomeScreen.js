import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
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
    <ImageBackground
      source={{ uri: 'https://ifh.cc/g/7wrxPV.jpg' }}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.inner1}>
          <Text style={styles.text}>
            {year}년 {month}월 {date}일
          </Text>
          <Text style={styles.text}>안녕하세요 {user.name} 트레이너님.</Text>
        </View>
        <View style={styles.inner2}>
          {todayLecture.length !== 0 ? (
            <View style={styles.contentsContainer}>
              {todayLecture
                .sort(function (a, b) {
                  return (
                    a['time'].replace(':', '') - b['time'].replace(':', '')
                  );
                })
                .map((lecture) => (
                  <Lecture
                    key={lecture.id}
                    time={lecture.time}
                    name={lecture.name}
                    trainer={user.trainer}
                  />
                ))}
            </View>
          ) : (
            <View style={styles.contentsContainer}>
              <Text style={styles.emptyText}>오늘 일정이 없습니다.</Text>
            </View>
          )}
          <BoxButton
            title={'일정표'}
            onPress={() => {
              navigation.navigate('TCAL', {
                data: allLectures,
              });
            }}
          />
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
    minHeight: '40%',
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
  emptyText: {
    fontSize: 18,
    fontWeight: '500',
  },
});
