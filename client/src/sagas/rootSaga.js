import userSaga from "./userSaga";
import diskSaga from './diskSaga';
import { all } from 'redux-saga/effects';


export default function* rootSaga() {
  yield all([
    ...userSaga,
    ...diskSaga,
  ]);
}
