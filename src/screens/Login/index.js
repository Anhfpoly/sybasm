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
  SafeAreaView,
} from 'react-native';

export default class Login extends Component {
  _login() {
    this.props.navigation.navigate('VehicleOwner');
  }
  componentDidMount() {}

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              this._login();
            }}>
            <Text style={styles.textButton}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 400,
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
