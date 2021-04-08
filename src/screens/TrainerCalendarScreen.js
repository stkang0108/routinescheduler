import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import { Agenda } from 'react-native-calendars';

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

export default function TrainerCalendarScreen({ route }) {
  const { data } = route.params;
  const [items, setItems] = useState({});

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
        if (data.length !== 0) {
          selectedDayItem = [];
          for (let j = 0; j < data.length; j++) {
            if (data[j].date === strTime) {
              selectedDayItem.push({
                date: strTime,
                id: data[j].id,
                time: data[j].time,
                name: data[j].postedBy.name,
              });
            }
            items[strTime] = [];
            items[strTime].push(selectedDayItem);
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
      <View>
        <Card style={styles.itemContainer}>
          <Card.Content>
            <View style={styles.item}>
              {item
                .sort(function (a, b) {
                  return (
                    a['time'].replace(':', '') - b['time'].replace(':', '')
                  );
                })
                .map((item) => (
                  <Text key={item.id}>
                    {item.time} {item.name} 회원님
                  </Text>
                ))}
            </View>
          </Card.Content>
        </Card>
      </View>
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
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
});
