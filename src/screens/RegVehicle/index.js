import React, {Component} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {TextInput, Header} from '../../components';

export default class RegVehicle extends Component {
  static navigationOptions = {header: null};
  render() {
    return (
      <SafeAreaView>
        <Header title={'Cấp chứng nhận đăng ký xe'} hideBars={true} />
      </SafeAreaView>
    );
  }
}
