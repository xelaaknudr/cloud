import { call, takeEvery, put } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { actions, appendUserActionCreator } from '../actions/user';

import { signIn, logIn, auth } from '../api/user';

export function* signInSaga({ payload }) {
  try {
    yield call(signIn, payload);
    toastr.success('Пользователь создан, воспользуйтесь формой логина');
  } catch (e) {
    toastr.error(e.response.data.message);
  }
}

export function* logInSaga({ payload }) {
  try {
    const { data } = yield call(logIn, payload);
    yield put(appendUserActionCreator(data.user));
    localStorage.setItem('token', data.token);
  } catch (e) {
    toastr.error(e.response.data.message);
  }
}

export function* authSaga() {
  try {
    const { data } = yield call(auth);
    yield put(appendUserActionCreator(data.user));
    localStorage.setItem('token', data.token);
  } catch (e) {
    localStorage.removeItem('token');
  }
}

export default [
  takeEvery(actions.SIGN_IN, signInSaga),
  takeEvery(actions.LOG_IN, logInSaga),
  takeEvery(actions.AUTH, authSaga),
];
