import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import { Agenda } from 'react-native-calendars';

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

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

export default function CalendarScreen({ navigation }) {
  const [items, setItems] = useState({});
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
  // console.log(allSchedule[6].date);

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        for (let j = 0; j < allSchedule.length; j++) {
          if (allSchedule[j].date === strTime) {
            if (!items[strTime]) {
              items[strTime] = [];
              items[strTime].push({
                date: strTime,
                todo: allSchedule[j].todo,
              });
            }
          }
        }
      }

      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          items[strTime].push({
            date: strTime,
          });
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigation.navigate('SELECT', {
            name: user.name,
            email: user.email,
            date: item.date,
          });
        }}
      >
        <Card>
          <Card.Content>
            <View style={styles.item}>
              <Text>{item.todo}</Text>
              <Avatar.Text label='PT' />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={{ today }}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  itemContainer: { marginRight: 10, marginTop: 18 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addBtn: {},
});
