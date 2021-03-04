import { call } from 'redux-saga/effects';
import axios from "axios";

export function* signIn(data) {
  return yield call(axios.post, 'http://localhost:5000/api/auth/registration', data);
}

export function* logIn(data) {
  return yield call(axios.post,'http://localhost:5000/api/auth/login', data);
}

export function* auth() {
  return yield call(axios.get, 'http://localhost:5000/api/auth/auth', {headers: {
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }});
}

