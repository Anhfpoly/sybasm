import React, {Component} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {TextInput, Header} from '../../components';

export default class AddRecord extends Component {
  static navigationOptions = {header: null};
  render() {
    return (
      <SafeAreaView>
        <Header title={'Lập biên bản'} hideBars={true} />
      </SafeAreaView>
    );
  }
}