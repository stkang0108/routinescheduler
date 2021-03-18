import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { StyleSheet, Text, View, Picker } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import BoxButton from '../components/BoxButton';

const GET_MEMBER = gql`
  query getMember($name: String!) {
    getMember(name: $name) {
      name
      email
    }
  }
`;

export default function MembersScreen({ navigation }) {
  const [choosenMember, setChoosenMember] = useState('');
  const [choosenIndex, setChoosenIndex] = useState('2');
  const [user, setUser] = useState({});
  useEffect(() => {
    SecureStore.getItemAsync('Auth').then((Auth) => {
      setUser(JSON.parse(Auth).user);
    });
  }, []);
  const { loading, error, data } = useQuery(GET_MEMBER, {
    variables: { name: user.name },
  });
  if (loading) return null;
  if (error) return 'Error! ${error}';

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={choosenMember}
        onValueChange={(itemValue, itemIndex) => {
          setChoosenMember(itemValue);
          setChoosenIndex(itemIndex);
        }}
      >
        {data.getMember.map((member) => (
          <Picker.Item
            key={choosenIndex}
            label={member.name}
            value={member.name}
          />
        ))}
      </Picker>
      <Text style={styles.text}>선택된 회원: {choosenMember}</Text>
      <BoxButton
        title={'OK'}
        style={styles.button}
        onPress={() => {
          navigation.navigate('MCAL', {
            name: choosenMember,
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 20,
  },
  text: {
    fontSize: 20,
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'center',
    marginTop: 15,
  },
});
