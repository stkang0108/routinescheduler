import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Todo from '../components/Todo';
import Diet from '../components/Diet';

const GET_SCHEDULES = gql`
  query getSchedule($email: String!) {
    getSchedule(email: $email) {
      date
      todo
      diet
    }
  }
`;
const day = new Date();
const year = day.getFullYear();
const month =
  day.getMonth() + 1 < 10 ? '0' + (day.getMonth() + 1) : day.getMonth() + 1;
const date = day.getDate() < 10 ? '0' + day.getDate() : day.getDate();
const today = `${year}-${month}-${date}`;

export default function MainScreen() {
  const [user, setUser] = useState({});
  useEffect(() => {
    SecureStore.getItemAsync('Auth').then((Auth) => {
      setUser(JSON.parse(Auth).user);
    });
  }, []);
  const { loading, error, data } = useQuery(GET_SCHEDULES, {
    variables: { email: user.email },
  });
  if (loading) return null;
  if (error) return 'Error! ${error}';

  const allSchedule = data.getSchedule;
  const todaySchedule = new Object();
  for (let i = 0; i < allSchedule.length; i++) {
    if (allSchedule[i].date === today) {
      todaySchedule.todo = allSchedule[i].todo;
      todaySchedule.diet = allSchedule[i].diet;
    }
  }

  return (
    <View style={styles.container}>
      <Text>{today}</Text>
      <Text>안녕하세요 {user.name} 님.</Text>
      <Todo contents={todaySchedule.todo} />
      <Diet food={todaySchedule.diet} />
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
});
