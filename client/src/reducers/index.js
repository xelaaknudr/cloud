import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { createLogger } from 'redux-logger';
import userReducer from './userReducer';
import fileReducer from './fileReducer';
import rootSaga from '../sagas/rootSaga';

const rootReducer = combineReducers({
  user: userReducer,
  files: fileReducer,
  toastr: toastrReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(
    sagaMiddleware,
    createLogger(),
  ),
));

sagaMiddleware.run(rootSaga);
