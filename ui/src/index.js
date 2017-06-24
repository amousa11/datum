import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom'
import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

import sellDataReducer from './components/SellData/sellData.reducer';
import dataViewReducer from './components/DataView/dataView.reducer';

import watchSellDataSubmit from './components/SellData/sellData.saga';

import App from "./App";

const rootReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  // YOUR REDUCERS HERE
  sellData: sellDataReducer,
  dataView: dataViewReducer,
});

const rootSaga = function* startForeman() {
  yield [
    // YOUR SAGAS HERE
    fork(watchSellDataSubmit)
  ]
};

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
  //window.devToolsExtension ? window.devToolsExtension() : f => f,
);

// then run the saga
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);