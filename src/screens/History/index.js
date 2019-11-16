import React, {Component} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {TextInput, Header} from '../../components';

export default class History extends Component {
  static navigationOptions = {header: null};
  render() {
    return (
      <SafeAreaView>
        <Header title={'Lịch sử vi phạm'} hideBars={true} />
      </SafeAreaView>
    );
  }
}
