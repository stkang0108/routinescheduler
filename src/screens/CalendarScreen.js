import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import { Agenda } from 'react-native-calendars';
import { GET_SCHEDULES_AND_LECTURE } from '../query_mutation';

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
  const { loading, error, data } = useQuery(GET_SCHEDULES_AND_LECTURE, {
    variables: { name: user.name },
    pollInterval: 300,
  });
  if (loading) return null;
  if (error) return 'Error! ${error}';

  const allSchedule = data.getSchedule;
  const allLecture = data.getLecture;
  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          items[strTime].push({
            date: strTime,
          });
        }
        if (allSchedule.length !== 0) {
          for (let j = 0; j < allSchedule.length; j++) {
            if (allSchedule[j].date === strTime) {
              items[strTime] = [];
              items[strTime].push({
                date: strTime,
                todo: allSchedule[j].todo,
              });
            }
          }
        }
        if (allLecture.length !== 0) {
          for (let k = 0; k < allLecture.length; k++) {
            if (allLecture[k].date === strTime) {
              items[strTime] = [];
              items[strTime].push({
                date: strTime,
                time: allLecture[k].time,
              });
            }
          }
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
        onPress={() => {
          navigation.navigate('SELECT', {
            name: user.name,
            date: item.date,
          });
        }}
      >
        <Card style={styles.itemContainer}>
          <Card.Content>
            <>
              {item.todo ? (
                <View style={styles.schedule}>
                  <Text>{item.todo}</Text>
                </View>
              ) : item.time ? (
                <View style={styles.lecture}>
                  <Text>{item.time}</Text>
                  <Text style={{ fontSize: 25 }}>🏃‍♂️🏃‍♀️🏃</Text>
                </View>
              ) : (
                <View style={styles.schedule} />
              )}
            </>
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
        theme={{
          agendaDayTextColor: '#ff7420',
          agendaDayNumColor: '#ff7420',
          agendaTodayColor: '#ff7420',
          agendaKnobColor: '#ff7420',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  itemContainer: {
    marginRight: 10,
    marginTop: 18,
    borderRadius: 15,
  },
  schedule: {
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lecture: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
