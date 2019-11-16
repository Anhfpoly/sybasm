import React, {Component} from 'react';
import AppContainer from './navigation/route';
import database from '@react-native-firebase/database';
export default class App extends Component {
  componentDidMount() {
    this._getABC()
  }
  _getABC = async() => {
    const ref = database().ref(`/users/`);
    const snapshot = await ref.once('value');
    console.log(snapshot.val())
  }
  render() {
    return <AppContainer />;
  }
}
