import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import diskSaga from './diskSaga';


export default function* rootSaga() {
  yield all([
    ...userSaga,
    ...diskSaga,
  ]);
}
