/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import firebase from 'firebase';
import { RouterComponent } from './Router'


export default class App extends Component<{}> {
  componentWillMount(){
    var config = {
      apiKey: "AIzaSyDku_nUhk5LfBXl2Dm4jKIcQvaVCf_4C_k",
      authDomain: "manager-7a59b.firebaseapp.com",
      databaseURL: "https://manager-7a59b.firebaseio.com",
      projectId: "manager-7a59b",
      storageBucket: "manager-7a59b.appspot.com",
      messagingSenderId: "938732519722"
    };

    firebase.initializeApp(config);
  }
  render() {
    let store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

    return (
      <Provider store={store} key={Date.now()}>
        <RouterComponent />
      </Provider>
    );
  }
}
