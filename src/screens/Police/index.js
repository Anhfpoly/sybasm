import React, {Component} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {TextInput, Header} from '../../components';

export default class Police extends Component {
  static navigationOptions = {header: null};
  render() {
    return (
      <SafeAreaView>
        <Header title={'Thông tin cá nhân'} hideBars={true} />
      </SafeAreaView>
    );
  }
}
