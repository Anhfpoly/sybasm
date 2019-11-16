import React, {Component} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {TextInput, Header} from '../../components';

export default class Manage extends Component {
  static navigationOptions = {header: null};
  render() {
    return (
      <SafeAreaView>
        <Header title={'Quản lý người dùng'} hideBars={true} />
      </SafeAreaView>
    );
  }
}
