import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { StyleSheet, Text, View } from 'react-native';
import Todo from '../components/Todo';
import Diet from '../components/Diet';

const GET_SCHEDULES = gql`
  query getSchedule($name: String!) {
    getSchedule(name: $name) {
      date
      todo
      diet
    }
  }
`;

export default function SelectedScreen({ route }) {
  const { date, email, name } = route.params;
  const { loading, error, data } = useQuery(GET_SCHEDULES, {
    variables: { name },
  });
  if (loading) return null;
  if (error) return 'Error! ${error}';

  const allSchedule = data.getSchedule;
  const SelectedDateSchedule = new Object();
  for (let i = 0; i < allSchedule.length; i++) {
    if (allSchedule[i].date === date) {
      SelectedDateSchedule.todo = allSchedule[i].todo;
      SelectedDateSchedule.diet = allSchedule[i].diet;
    }
  }

  return (
    <View style={styles.container}>
      <Text>{date}</Text>
      <Text>안녕하세요 {name} 님.</Text>
      <Todo contents={SelectedDateSchedule.todo} />
      <Diet food={SelectedDateSchedule.diet} />
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
