import React, {Component} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {TextInput, Header} from '../../components';

export default class Statistical extends Component {
  static navigationOptions = {header: null};
  render() {
    return (
      <SafeAreaView>
        <Header title={'Thống kê doanh số'} hideBars={true} />
      </SafeAreaView>
    );
  }
}
