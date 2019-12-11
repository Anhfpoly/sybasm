import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import {TextInput, Header} from '../../components';
import firebase from '@react-native-firebase/app';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Dialog, {
  DialogFooter,
  DialogButton,
  ScaleAnimation,
  DialogContent,
} from 'react-native-popup-dialog';

export default class Profile extends Component {
  static navigationOptions = {header: null};
  state = {
    visible: false,
  };
  signOut = async () => {
    await firebase.auth().signOut();
    this.props.navigation.navigate('Login');
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={require('../../assets/images/driver.png')}
          />
          <Text style={styles.name}>Nguyễn Cao Hoàng Triều</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text
            style={{
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: 16,
              paddingTop: 20,
            }}>
            Thông tin chi tiết
          </Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Địa chỉ</Text>
            <View style={{flexDirection: 'row', paddingLeft: 10}}>
              <Entypo name={'address'} size={18} color="#4285f4" />
              <Text style={styles.infoDetail}>TP.HCM</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Số giấy phép lái xe</Text>
            <View style={{flexDirection: 'row', paddingLeft: 10}}>
              <FontAwesome
                name={'drivers-license-o'}
                size={18}
                color="#4285f4"
              />
              <Text style={styles.infoDetail}>ABC-XYZ</Text>
            </View>
          </View>
          <View style={(styles.infoRow, {borderBottomColor: 'white'})}>
            <Text style={styles.infoTitle}>Số điện thoại</Text>
            <View style={{flexDirection: 'row', paddingLeft: 10}}>
              <FontAwesome name={'phone'} size={18} color="#4285f4" />
              <Text style={styles.infoDetail}>0909123456</Text>
            </View>
          </View>
        </View>
        <View style={styles.vehicleContainer}>
          <Text
            style={{
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: 16,
              paddingTop: 20,
            }}>
            Danh sách xe
          </Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Loại phương tiện</Text>
            <View style={{flexDirection: 'row', paddingLeft: 10}}>
              <FontAwesome name={'car'} size={18} color="#4285f4" />
              <Text style={styles.infoDetail}>Xe 2 bánh</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Biển số</Text>
            <View style={{flexDirection: 'row', paddingLeft: 10}}>
              <FontAwesome name={'drivers-license'} size={18} color="#4285f4" />
              <Text style={styles.infoDetail}>ABC-XYZ</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Loại xe</Text>
            <View style={{flexDirection: 'row', paddingLeft: 10}}>
              <FontAwesome name={'cube'} size={18} color="#4285f4" />
              <Text style={styles.infoDetail}>Honda Airblade</Text>
            </View>
          </View>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => this.setState({visible: true})}>
            <Text style={styles.textButton}>Đăng Xuất</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Dialog
            visible={this.state.visible}
            onTouchOutside={() => {
              this.setState({visible: false});
            }}
            footer={
              <DialogFooter>
                <DialogButton
                  text="Huỷ"
                  onPress={() => {
                    this.setState({visible: false});
                  }}
                />
                <DialogButton
                  text="Đăng Xuất"
                  onPress={() => {
                    this.setState({visible: false}, () => this.signOut());
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
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{
                    margin: 12,
                    fontWeight: 'bold',
                    fontSize: 23,
                    marginBottom: 20,
                  }}>
                  Thông Báo
                </Text>
                <Text style={{fontSize: 16, width: 260, textAlign: 'center'}}>
                  Bạn muốn đăng xuất?
                </Text>
              </View>
            </DialogContent>
          </Dialog>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },
  avatarContainer: {
    borderRadius: 7,
    marginTop: 5,
    marginHorizontal: 5,
    elevation: 4,
    backgroundColor: 'white',
    overflow:
      Platform.OS === 'android' && Platform.Version >= 21
        ? 'hidden'
        : 'visible',
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    marginVertical: 15,
  },
  name: {
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoContainer: {
    borderRadius: 7,
    margin: 5,
    elevation: 4,
    backgroundColor: 'white',
    overflow:
      Platform.OS === 'android' && Platform.Version >= 21
        ? 'hidden'
        : 'visible',
  },
  infoRow: {
    borderBottomColor: 'silver',
    borderBottomWidth: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  infoDetail: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    color: 'grey',
  },
  vehicleContainer: {
    // flex: 1,
    borderRadius: 7,
    marginHorizontal: 5,
    marginBottom: 5,
    elevation: 4,
    backgroundColor: 'white',
    overflow:
      Platform.OS === 'android' && Platform.Version >= 21
        ? 'hidden'
        : 'visible',
  },
  trademark: {
    flex: 1,
    color: 'grey',
    alignSelf: 'center',
    fontStyle: 'italic',
    position: 'absolute',
    fontSize: 11,
    bottom: 0,
    paddingBottom: 5,
  },

  loginButton: {
    width: 120,
    height: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4285f4',
    marginBottom: 30,
    marginTop: 10,
  },
  textButton: {
    color: 'white',
    fontSize: 16,
  },
});
