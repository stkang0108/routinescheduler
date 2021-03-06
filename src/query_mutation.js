import { gql } from '@apollo/client';

////////////// query ////////////////

export const GET_SCHEDULES_AND_TODAYLECTURE = gql`
  query($name: String!) {
    getSchedule(name: $name) {
      date
      todo
    }
    getTodayLecture(name: $name) {
      id
      date
      time
      postedBy {
        name
      }
    }
  }
`;

export const GET_SCHEDULES_AND_LECTURE = gql`
  query($name: String!) {
    getSchedule(name: $name) {
      id
      date
      todo
    }
    getLecture(name: $name) {
      id
      date
      time
    }
  }
`;

export const GET_TODAYLECTURE = gql`
  query($name: String!) {
    getTodayLecture(name: $name) {
      id
      date
      time
      postedBy {
        name
      }
    }
  }
`;

export const GET_MEMBER = gql`
  query getMember($name: String!) {
    getMember(name: $name) {
      name
      email
    }
  }
`;

////////////// mutation ////////////////
export const SIGNIN = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
      user {
        email
        name
        trainer
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name)
  }
`;

export const ADDTRAINER = gql`
  mutation addTrainer($email: String!, $trainer: String!) {
    addTrainer(email: $email, trainer: $trainer)
  }
`;

export const ADDLECTURE = gql`
  mutation addLecture($name: String!, $date: String!, $time: String!) {
    addLecture(name: $name, date: $date, time: $time)
  }
`;

export const ADDSCHEDULE = gql`
  mutation addSchedule($name: String!, $date: String!, $todo: String!) {
    addSchedule(name: $name, date: $date, todo: $todo)
  }
`;

export const DELETELECTURE = gql`
  mutation deleteLecture($id: ID!) {
    deleteLecture(id: $id)
  }
`;

export const DELETESCHEDULE = gql`
  mutation deleteSchesule($id: ID!) {
    deleteSchedule(id: $id)
  }
`;

export const EDITLECTURE = gql`
  mutation editLecture($id: ID!, $time: String!) {
    editLecture(id: $id, time: $time)
  }
`;

export const EDITSCHEDULE = gql`
  mutation editSchedule($id: ID!, $todo: String!) {
    editSchedule(id: $id, todo: $todo)
  }
`;
