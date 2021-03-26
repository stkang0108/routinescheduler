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
      date
      todo
      diet
    }
    getLecture(name: $name) {
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
