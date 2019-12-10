import React, {Component} from 'react';
import {Text, View, SafeAreaView,TouchableOpacity} from 'react-native';
import {TextInput, Header} from '../../components';
import firebase from '@react-native-firebase/app'

export default class Profile extends Component {
  static navigationOptions = {header: null};
  signOut = async () => {
    await firebase.auth().signOut();
    this.props.navigation.navigate('Login')
  }
  render() {
    return (
      <SafeAreaView>
        <Header title={'Thông tin chủ phương tiện'} hideBars={true} />
        <TouchableOpacity onPress={() => this.signOut()}>
          <Text style={{padding: 10, backgroundColor:'red', color:'#FFF'}}>Đăng xuất</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
