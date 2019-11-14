import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

export default class Login extends Component {
  state={
  }
  _login() {
    if(this.state.userName="cx"){
      this.props.navigation.navigate('VehicleOwner');
    }
    if(this.state.userName="cs"){
      this.props.navigation.navigate('VehicleOwner');
    }
    if(this.state.userName="kb"){
      this.props.navigation.navigate('VehicleOwner');
    }
    if(this.state.userName="dn"){
      this.props.navigation.navigate('VehicleOwner');
    }

  }
  componentDidMount() {}

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* <Image
            source={require('../../images/logo.png')}
            style={styles.logo}></Image> */}
          <Text style={styles.title}>Đăng Nhập</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              textContentType="emailAddress"
              keyboardType="email-address"
              placeholder="Nhập vào email"
              onChangeText={text => {
                this.setState(() => {
                  return {
                    userName: text,
                  };
                });
              }}
              value={this.state.userName}></TextInput>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              secureTextEntry={true}
              placeholder="Nhập vào mật khẩu"></TextInput>
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              this._login();
            }}>
            <Text style={styles.textButton}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
    color: '#3b5998',
    marginBottom: 10,
  },
  textInput: {
    width: 280,
    height: 45,
    paddingLeft: 6
  },
  textInputContainer: {
    backgroundColor: '#f7f7f7',
    marginBottom: 10,
    borderRadius: 6,
    borderWidth: 1 / 2,
    borderColor: 'gray',
  },
  loginButton: {
    width: 280,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b5998',
  },
  textButton: {
    color: 'white',
    fontSize: 16,
  },
  logo: {
    width: 120,
    height: 120,
  },
});
