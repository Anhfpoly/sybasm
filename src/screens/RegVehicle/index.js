import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {TextInput, Header} from '../../components';
import database from '@react-native-firebase/database';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Fumi} from 'react-native-textinput-effects';

export default class RegVehicle extends Component {
  static navigationOptions = {header: null};
  state = {
    chuxe: '',
    dienthoai: '',
    diachi: '',
    loaixe: '',
    mauxe: '',
    bienso: '',
    sokhung: '',
    somay: '',
    ngaycap: '',
    noicap: '',
    loaiphuongtien: ''
  };
  componentDidMount() {
    // this._getData();
  }
  _setData = async () => {
    const ref = database().ref('vehicles');
    if (
      this.state.chuxe === '' ||
      this.state.dienthoai === '' ||
      this.state.diachi === '' ||
      this.state.loaixe === '' ||
      this.state.loaiphuongtien === '' ||
      this.state.mauxe === '' ||
      this.state.bienso === '' ||
      this.state.sokhung === '' ||
      this.state.somay === '' ||
      this.state.ngaycap === '' ||
      this.state.noicap === ''
    ) {
      alert('Vui lòng nhập đủ thông tin!');
    } else {
      ref.push({
        chuxe: this.state.chuxe,
        dienthoai: this.state.dienthoai,
        diachi: this.state.diachi,
        loaixe: this.state.loaixe,
        loaiphuongtien: this.state.loaiphuongtien,
        mauxe: this.state.mauxe,
        bienso: this.state.bienso,
        sokhung: this.state.sokhung,
        somay: this.state.somay,
        ngaycap: this.state.ngaycap,
        noicap: this.state.noicap,
      });
      this.setState({
        chuxe: "",
        dienthoai: "",
        diachi: "",
        loaixe: "",
        loaiphuongtien: "",
        mauxe: "",
        bienso: "",
        sokhung: "",
        somay: "",
        ngaycap: "",
        noicap: "",
      })
      alert('Đăng ký thành công!');
    }
  };
  _regVehicle() {
    this._setData();
  }
  render() {
    return (
      <SafeAreaView>
        <Header title={'Cấp chứng nhận đăng ký xe'} hideBars={true} />
        <ScrollView
          style={{
            marginHorizontal: 10,
            marginVertical: 6,
          }}>
          <View
            style={{
              borderColor: '#4285f4',
              borderWidth: 1,
              borderRadius: 12,
              marginBottom: 3,
            }}>
            <Fumi
              label={'Chủ Xe'}
              iconClass={FontAwesomeIcon}
              iconName={'university'}
              iconColor={'#4285f4'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              onChangeText={text => {
                this.setState({chuxe: text});
              }}
            />
          </View>
          <View
            style={{
              borderColor: '#4285f4',
              borderWidth: 1,
              borderRadius: 12,
              marginBottom: 3,
            }}>
            <Fumi
              label={'Điện Thoại'}
              iconClass={FontAwesomeIcon}
              iconName={'university'}
              iconColor={'#4285f4'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              onChangeText={text => {
                this.setState({dienthoai: text});
              }}
            />
          </View>
          <View
            style={{
              borderColor: '#4285f4',
              borderWidth: 1,
              borderRadius: 12,
              marginBottom: 3,
            }}>
            <Fumi
              label={'Địa Chỉ'}
              iconClass={FontAwesomeIcon}
              iconName={'university'}
              iconColor={'#4285f4'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              onChangeText={text => {
                this.setState({diachi: text});
              }}
            />
          </View>
          <View
            style={{
              borderColor: '#4285f4',
              borderWidth: 1,
              borderRadius: 12,
              marginBottom: 3,
            }}>
            <Fumi
              label={'Loại Xe'}
              iconClass={FontAwesomeIcon}
              iconName={'university'}
              iconColor={'#4285f4'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              onChangeText={text => {
                this.setState({loaixe: text});
              }}
            />
          </View>
          <View
            style={{
              borderColor: '#4285f4',
              borderWidth: 1,
              borderRadius: 12,
              marginBottom: 3,
            }}>
            <Fumi
              label={'Loại Phương Tiện'}
              iconClass={FontAwesomeIcon}
              iconName={'university'}
              iconColor={'#4285f4'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              onChangeText={text => {
                this.setState({loaiphuongtien: text});
              }}
            />
          </View>
          <View
            style={{
              borderColor: '#4285f4',
              borderWidth: 1,
              borderRadius: 12,
              marginBottom: 3,
            }}>
            <Fumi
              label={'Màu Xe'}
              iconClass={FontAwesomeIcon}
              iconName={'university'}
              iconColor={'#4285f4'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              onChangeText={text => {
                this.setState({mauxe: text});
              }}
            />
          </View>
          <View
            style={{
              borderColor: '#4285f4',
              borderWidth: 1,
              borderRadius: 12,
              marginBottom: 3,
            }}>
            <Fumi
              label={'Biển Số'}
              iconClass={FontAwesomeIcon}
              iconName={'university'}
              iconColor={'#4285f4'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              onChangeText={text => {
                this.setState({bienso: text});
              }}
            />
          </View>
          <View
            style={{
              borderColor: '#4285f4',
              borderWidth: 1,
              borderRadius: 12,
              marginBottom: 3,
            }}>
            <Fumi
              label={'Số Khung'}
              iconClass={FontAwesomeIcon}
              iconName={'university'}
              iconColor={'#4285f4'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              onChangeText={text => {
                this.setState({sokhung: text});
              }}
            />
          </View>
          <View
            style={{
              borderColor: '#4285f4',
              borderWidth: 1,
              borderRadius: 12,
              marginBottom: 12,
            }}>
            <Fumi
              label={'Số Máy'}
              iconClass={FontAwesomeIcon}
              iconName={'university'}
              iconColor={'#4285f4'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              onChangeText={text => {
                this.setState({somay: text});
              }}
            />
          </View>
          <View
            style={{
              borderColor: '#4285f4',
              borderWidth: 1,
              borderRadius: 12,
              marginBottom: 12,
            }}>
            <Fumi
              label={'Ngày Cấp'}
              iconClass={FontAwesomeIcon}
              iconName={'university'}
              iconColor={'#4285f4'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              onChangeText={text => {
                this.setState({ngaycap: text});
              }}
            />
          </View>
          <View
            style={{
              borderColor: '#4285f4',
              borderWidth: 1,
              borderRadius: 12,
              marginBottom: 12,
            }}>
            <Fumi
              label={'Nơi Cấp'}
              iconClass={FontAwesomeIcon}
              iconName={'university'}
              iconColor={'#4285f4'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              onChangeText={text => {
                this.setState({noicap: text});
              }}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 120,
            }}>
            <TouchableOpacity
              style={{
                width: 280,
                height: 45,
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#4285f4',
              }}
              onPress={() => {
                this._regVehicle();
              }}>
              <Text style={{color: 'white', fontSize: 16}}>Đăng Ký</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
