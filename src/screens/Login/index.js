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
  state = {
    username: 'Cs',
    password: '',
  };
  _login() {
    if (this.state.username === 'Cx') {
      this.props.navigation.navigate('VehicleOwner');
    } else if (this.state.username === 'Cs') {
      this.props.navigation.navigate('Police');
    } else if (this.state.username === 'Kb') {
      this.props.navigation.navigate('Treasury');
    } else if (this.state.username === 'Dn') {
      this.props.navigation.navigate('Business');
    } else {
      alert('Tài khoản đúng là: Cx, Cs, Kb, Dn ');
    }
  }
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
                    username: text,
                  };
                });
              }}
              value={this.state.username}></TextInput>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              secureTextEntry={true}
              placeholder="Nhập vào mật khẩu"
              onChangeText={text => {
                this.setState(() => {
                  return {
                    password: text,
                  };
                });
              }}
              value={this.state.password}></TextInput>
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
    color: '#4285f4',
    marginBottom: 10,
  },
  textInput: {
    width: 280,
    height: 45,
    paddingLeft: 6,
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
    backgroundColor: '#4285f4',
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
