import React, {Component} from 'react';
import {Text, View, SafeAreaView,TouchableOpacity, Image} from 'react-native';
import {TextInput, Header} from '../../components';
import firebase from '@react-native-firebase/app'

export default class Police extends Component {
  static navigationOptions = {header: null};
  signOut = async () => {
    await firebase.auth().signOut();
    this.props.navigation.navigate('Login')
  }
  render() {
    return (
      <SafeAreaView>
        <Header title={'Thông tin cảnh sát'} hideBars={true} />
        <TouchableOpacity onPress={() => this.signOut()}>
          <Text style={{padding: 10, backgroundColor:'red', color:'#FFF'}}>Đăng xuất</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
