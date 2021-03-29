import { gql } from '@apollo/client';

////////////// query ////////////////

export const GET_SCHEDULES_AND_TODAYLECTURE = gql`
  query($name: String!) {
    getSchedule(name: $name) {
      date
      todo
      diet
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
      diet
    }
    getLecture(name: $name) {
      id
      date
      time
    }
  }
`;

////////////// mutation ////////////////

export const ADDLECTURE = gql`
  mutation addLecture($name: String!, $date: String!, $time: String!) {
    addLecture(name: $name, date: $date, time: $time)
  }
`;

export const ADDSCHEDULE = gql`
  mutation addSchedule(
    $name: String!
    $date: String!
    $todo: String!
    $diet: String!
  ) {
    addSchedule(name: $name, date: $date, todo: $todo, diet: $diet)
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
  mutation editSchedule($id: ID!, $todo: String!, $diet: String!) {
    editSchedule(id: $id, todo: $todo, diet: $diet)
  }
`;
