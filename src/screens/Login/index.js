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
  Platform,
  AsyncStorage
} from 'react-native';
import Dialog, {
  DialogFooter,
  DialogButton,
  ScaleAnimation,
  DialogContent,
} from 'react-native-popup-dialog';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
export default class Login extends Component {
  state = {
    phone: '+84',
    otp: '',
    visible: false,
    isphone: false,
    isnext: false,
    user: null,
    logged: false,
  };
  componentDidMount() {
    this._checkLogin();
  }
  _saveStorage = async (value) => {
    try {
      await AsyncStorage.setItem('username', value);
    } catch (error) {
      // Error saving data
    }
  };
  _checkLogin = () => {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // console.log(user.toJSON());
        this.setState({user: user.toJSON(), logged: true}, () =>
          this.props.navigation.navigate('Police'),
        );
      } else {
        console.log('Đăng nhập thất bại');
      }
    });
  };
  _phoneAuth = async () => {
    try {
      const confirmResult = await auth().signInWithPhoneNumber(
        this.state.phone,
      );
      this.setState({confirmResult});
    } catch (e) {
      console.error(e); // Invalid code
    }
  };
  confirmCode = () => {
    const {otp, confirmResult} = this.state;

    if (confirmResult && otp.length) {
      confirmResult
        .confirm(otp)
        .then(user => {
          return user;
        })
        .catch(error =>
          this.setState({message: `Code Confirm Error: ${error.message}`}),
        );
    }
    return null;
  };

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }
  _login() {
    this.setState({visible: true});
    this._saveStorage(this.state.phone);
  }
  _khong() {
    this.setState({visible: false});
  }
  _tieptuc() {
    if ((Platform.OS = 'android')) {
      this._phoneAuth();
    }
    this.setState({visible: false});
    let timer = setTimeout(() => {
      this.setState({isnext: !this.state.isnext});
    }, 300);
  }
  _gotoMain() {
    let result = this.confirmCode();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {this.state.isnext ? (
          <View style={styles.container}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}></Image>
            <Text style={{fontSize: 26, fontWeight: 'bold', color: '#4285f4'}}>
              Xác thực OTP
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: '#4285f4',
                paddingHorizontal: 60,
                paddingVertical: 12,
                textAlign: 'center',
              }}>
              {'Một mã xác thực đã được gửi đến\n'}
              {this.state.phone}
            </Text>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                textContentType="telephoneNumber"
                keyboardType="number-pad"
                placeholder="Nhập OTP"
                placeholderTextColor="#000"
                onChangeText={text => {
                  this.setState(() => {
                    return {
                      otp: text,
                      isphone: false,
                    };
                  });
                }}
                value={this.state.otp}></TextInput>
            </View>
            <TouchableOpacity
              disabled={this.state.isphone}
              style={styles.loginButton}
              onPress={() => {
                this._gotoMain();
              }}>
              <Text style={styles.textButton}>TIẾP TỤC</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.container}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}></Image>
            <Text style={{fontSize: 26, fontWeight: 'bold', color: '#4285f4'}}>
              Nhập số điện thoại
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: '#4285f4',
                paddingHorizontal: 60,
                paddingVertical: 12,
                textAlign: 'center',
              }}>
              Dùng số điện thoại để đăng nhập vào Traffic Bee
            </Text>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                textContentType="telephoneNumber"
                keyboardType="number-pad"
                placeholder="Nhập số điện thoại"
                placeholderTextColor="#000"
                onChangeText={text => {
                  this.setState(() => {
                    return {
                      phone: text,
                      isphone: false,
                    };
                  });
                }}
                value={this.state.phone}></TextInput>
            </View>
            <TouchableOpacity
              disabled={this.state.isphone}
              style={styles.loginButton}
              onPress={() => {
                this._login();
              }}>
              <Text style={styles.textButton}>TIẾP TỤC</Text>
            </TouchableOpacity>
            <View>
              <Dialog
                visible={this.state.visible}
                onTouchOutside={() => {
                  this.setState({visible: false});
                }}
                footer={
                  <DialogFooter>
                    <DialogButton
                      text="Không"
                      onPress={() => {
                        this._khong();
                      }}
                    />
                    <DialogButton
                      text="Tiếp Tục"
                      onPress={() => {
                        this._tieptuc();
                      }}
                    />
                  </DialogFooter>
                }
                dialogAnimation={
                  new ScaleAnimation({
                    slideFrom: 'bottom',
                  })
                }>
                <DialogContent>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{margin: 12}}>Bạn đã nhập</Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 23,
                        marginBottom: 20,
                      }}>
                      {this.state.phone}
                    </Text>
                    <Text style={{fontSize: 12, width: 260}}>
                      Chúng tôi sẽ gửi một mã xác thực đến số điện thoại bạn đã
                      nhập. Bạn có muốn tiếp tục?
                    </Text>
                  </View>
                </DialogContent>
              </Dialog>
            </View>
          </View>
        )}
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
    textAlign: 'center',
  },
  textInputContainer: {
    backgroundColor: '#f7f7f7',
    marginBottom: 10,
    borderRadius: 50,
    borderWidth: 1 / 2,
    borderColor: 'gray',
  },
  loginButton: {
    width: 280,
    height: 45,
    borderRadius: 50,
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
