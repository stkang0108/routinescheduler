import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const GET_SCHEDULES = gql`
  query getSchedule($email: String!) {
    getSchedule(email: $email) {
      date
      todo
      diet
    }
  }
`;
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();
const tooday = `${year}-${month}-${date}`;

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
  console.log(data.getSchedule[0].date);

  return (
    <View style={styles.container}>
      <Text>{tooday}</Text>
      {data.getSchedule.map((schedule) => (
        <Text>{schedule.date}</Text>
      ))}
      <Text>안녕하세요 {user.name} 님.</Text>
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
