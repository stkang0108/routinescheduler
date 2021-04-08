import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { StyleSheet, Text, View, Picker, ImageBackground } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { GET_MEMBER } from '.././query_mutation';
import BoxButton from '../components/BoxButton';

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
    <ImageBackground
      source={{ uri: 'https://ifh.cc/g/TWShOt.jpg' }}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.inner1}>
          <Text style={styles.suggestText}>
            조회를 원하는 회원님을 선택해 주세요.
          </Text>
        </View>
        <View style={styles.inner2}>
          <View style={styles.contentsContainer}>
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
          </View>
          <Text style={styles.memberText}>
            선택된 회원: {choosenMember} 회원님
          </Text>
          <BoxButton
            style={{ marginTop: 20 }}
            title={'바로가기'}
            onPress={() => {
              navigation.navigate('MCAL', {
                name: choosenMember,
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
    paddingTop: 130,
    paddingHorizontal: 40,
  },
  inner2: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentsContainer: {
    backgroundColor: '#fff',
    width: '85%',
    minHeight: '40%',
    paddingVertical: 10,
    paddingHorizontal: 35,
    marginBottom: 15,
    borderRadius: 20,
    borderColor: '#ff7420',
    borderWidth: 3,
    justifyContent: 'center',
  },
  suggestText: {
    fontSize: 20,
    fontWeight: '700',
  },
  memberText: {
    fontSize: 18,
    fontWeight: '700',
  },
});
