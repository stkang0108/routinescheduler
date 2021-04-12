import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import { EDITSCHEDULE } from '../query_mutation';
import IconButton from '../components/IconButton';
import Input from '../components/Input';
import BoxButton from '../components/BoxButton';

export default function EditScheduleScreen({ route, navigation }) {
  const { id, etodo } = route.params;
  const [todo, setTodo] = useState(etodo);

  const [editSchedule] = useMutation(EDITSCHEDULE);
  const editScheduleAlert = () =>
    Alert.alert(
      '스케줄을 수정하시겠습니까?',
      '',
      [
        { text: '확인', onPress: () => scheduleEdit() },
        { text: '취소', style: 'cancel' },
      ],
      { cancelable: false }
    );
  const scheduleEdit = async () => {
    try {
      await editSchedule({
        variables: { id, todo },
      });
      await navigation.navigate('MCAL');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    >
      <ImageBackground
        source={{ uri: 'https://ifh.cc/g/TWShOt.jpg' }}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.inner1}>
              <IconButton
                style={styles.iconButton}
                name={'ios-close-circle-outline'}
                size={30}
                color='#ff7420'
                onPress={() => {
                  navigation.pop();
                }}
              />
              <Text style={styles.suggest}>
                회원님의 스케줄을 수정해주세요.
              </Text>
            </View>
            <View style={styles.inner2}>
              <View style={styles.contentsContainer}>
                <Input
                  style={{
                    minHeight: '20%',
                    paddingTop: 20,
                  }}
                  multiline={true}
                  value={todo}
                  onChangeText={setTodo}
                />
              </View>
              <BoxButton title={'수정하기'} onPress={editScheduleAlert} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </KeyboardAvoidingView>
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
    alignItems: 'center',
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
    alignItems: 'center',
  },
  suggest: {
    fontSize: 20,
    fontWeight: '900',
  },
  iconButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
});
