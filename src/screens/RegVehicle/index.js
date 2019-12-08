import React, {Component} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {TextInput, Header} from '../../components';
import database from '@react-native-firebase/database';

export default class RegVehicle extends Component {
  static navigationOptions = {header: null};
  componentDidMount() {
    this._getValue();
    this._setValue();
  }
  _getValue = async () => {
    const ref = database().ref('/users/');
    const snapshot = await ref.once('value');
    console.log(snapshot.val());
  };
  _setValue = async () => {
    const ref = database().ref('users');
    console.log('New record key:', ref.key);
    await ref.child('test').set({
      first: 'Ada 24',
      last: 'Lovelace 236',
    });
  };
  render() {
    return (
      <SafeAreaView>
        <Header title={'Cấp chứng nhận đăng ký xe'} hideBars={true} />
      </SafeAreaView>
    );
  }
}
