import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Dialog, {
  DialogFooter,
  DialogButton,
  ScaleAnimation,
  DialogContent,
} from 'react-native-popup-dialog';
import {TextInput, Header} from '../../components';
import database from '@react-native-firebase/database';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Fumi} from 'react-native-textinput-effects';

export default class RegVehicle extends Component {
  static navigationOptions = {header: null};
  state = {
    sogiay: '',
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
    loaiphuongtien: '',
    visible: true,
    isReg: true,
    macs: '',
    hoten: '',
    ngaysinh: '',
    ngayvao: '',
    capbac: '',
    donvi: '',
    loaitk: 'cx',
  };
  componentDidMount() {
    this._getSoGiayPhep();
    this._getMaCS();
  }
  _getSoGiayPhep = async () => {
    const ref = database().ref('inumber');
    ref.on('value', snapshot => {
      let num = snapshot.val() + 1;
      if (num <= 9) {
        num = '00000' + num;
      } else if (num <= 99) {
        num = '0000' + num;
      } else if (num <= 999) {
        num = '000' + num;
      } else if (num <= 9999) {
        num = '00' + num;
      } else if (num <= 99999) {
        num = '0' + num;
      } else if (num <= 999999) {
        num = num;
      }
      this.setState({
        sogiay: num,
      });
    });
  };
  _getMaCS = async () => {
    const ref = database().ref('ipolice');
    ref.on('value', snapshot => {
      let num = snapshot.val() + 1;
      if (num <= 9) {
        num = 'CS00000' + num;
      } else if (num <= 99) {
        num = 'CS0000' + num;
      } else if (num <= 999) {
        num = 'CS000' + num;
      } else if (num <= 9999) {
        num = 'CS00' + num;
      } else if (num <= 99999) {
        num = 'CS0' + num;
      } else if (num <= 999999) {
        num = num;
      }
      this.setState({
        macs: num,
      });
    });
  };
  _setVehicle = async () => {
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
        sogiay: this.state.sogiay,
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
        loaitk: 'cx',
      });
      this._setUsers(this.state.chuxe, this.state.dienthoai, 'cx');
      this.setState({
        chuxe: '',
        dienthoai: '',
        diachi: '',
        loaixe: '',
        loaiphuongtien: '',
        mauxe: '',
        bienso: '',
        sokhung: '',
        somay: '',
        ngaycap: '',
        noicap: '',
        loaitk: '',
        ghichu: '',
      });
      this._setIndexNumber();
      alert('Đăng ký thành công!');
    }
  };
  _setPA = async () => {
    const ref = database().ref('polices');
    if (
      this.state.macs === '' ||
      this.state.hoten === '' ||
      this.state.ngaysinh === '' ||
      this.state.ngayvao === '' ||
      this.state.capbac === '' ||
      this.state.donvi === '' ||
      this.state.dienthoai === ''
    ) {
      alert('Vui lòng nhập đủ thông tin!');
    } else {
      ref.push({
        macs: this.state.macs,
        hoten: this.state.hoten,
        ngaysinh: this.state.ngaysinh,
        ngayvao: this.state.ngayvao,
        capbac: this.state.capbac,
        donvi: this.state.donvi,
        dienthoai: this.state.dienthoai,
        loaitk: 'cs',
      });
      this._setUsers(this.state.hoten, this.state.dienthoai, 'cs');
      this.setState({
        macs: '',
        hoten: '',
        ngaysinh: '',
        ngayvao: '',
        capbac: '',
        donvi: '',
        dienthoai: '',
        loaitk: '',
      });
      this._setIndexPolice();
      alert('Đăng ký thành công!');
    }
  };
  _setIndexNumber = async () => {
    const ref = database().ref('inumber');
    const snapshot = await ref.once('value');
    const i = snapshot.val() + 1;
    await database()
      .ref('inumber')
      .set(i);
  };
  _setIndexPolice = async () => {
    const ref = database().ref('ipolice');
    const snapshot = await ref.once('value');
    const i = snapshot.val() + 1;
    await database()
      .ref('ipolice')
      .set(i);
  };
  _regVehicle() {
    this._setVehicle();
  }
  _regPA() {
    this._setPA();
  }
  _setUsers = async (ten, dt, loaitk) => {
    const ref = database().ref('users');
    ref.push({
      hoten: ten,
      dienthoai: dt,
      loaitk: loaitk,
    });
  };
  render() {
    return (
      <SafeAreaView>
        <View>
          <Dialog
            visible={this.state.visible}
            onTouchOutside={() => {
              this.setState({visible: false});
            }}
            footer={
              <DialogFooter>
                <DialogButton
                  text="Phương Tiện"
                  onPress={() => {
                    this.setState({visible: false}, () =>
                      this.setState({isReg: true}),
                    );
                  }}
                />
                <DialogButton
                  text="Tài Khoản"
                  onPress={() => {
                    this.setState({visible: false}, () =>
                      this.setState({isReg: false}),
                    );
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
                  Vui lòng chọn loại hình đăng ký?
                </Text>
              </View>
            </DialogContent>
          </Dialog>
        </View>
        {this.state.isReg ? (
          <>
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
                  height: 40,
                }}>
                <Text
                  style={{
                    lineHeight: 40,
                    textAlign: 'center',
                    color: '#ff4800',
                    fontSize: 20,
                  }}>
                  Mã Số: {this.state.sogiay}
                </Text>
              </View>
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
          </>
        ) : (
          <>
            <Header title={'Tạo Tài Khoản'} hideBars={true} />
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
                  height: 40,
                }}>
                <Text
                  style={{
                    lineHeight: 40,
                    textAlign: 'center',
                    color: '#ff4800',
                    fontSize: 20,
                  }}>
                  Mã Số: {this.state.macs}
                </Text>
              </View>
              <View
                style={{
                  borderColor: '#4285f4',
                  borderWidth: 1,
                  borderRadius: 12,
                  marginBottom: 3,
                }}>
                <Fumi
                  label={'Họ và Tên'}
                  iconClass={FontAwesomeIcon}
                  iconName={'university'}
                  iconColor={'#4285f4'}
                  iconSize={20}
                  iconWidth={40}
                  inputPadding={16}
                  onChangeText={text => {
                    this.setState({hoten: text});
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
                  label={'Ngày Sinh'}
                  iconClass={FontAwesomeIcon}
                  iconName={'university'}
                  iconColor={'#4285f4'}
                  iconSize={20}
                  iconWidth={40}
                  inputPadding={16}
                  onChangeText={text => {
                    this.setState({ngaysinh: text});
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
                  label={'Ngày Vào Ngành'}
                  iconClass={FontAwesomeIcon}
                  iconName={'university'}
                  iconColor={'#4285f4'}
                  iconSize={20}
                  iconWidth={40}
                  inputPadding={16}
                  onChangeText={text => {
                    this.setState({ngayvao: text});
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
                  label={'Cấp Bậc'}
                  iconClass={FontAwesomeIcon}
                  iconName={'university'}
                  iconColor={'#4285f4'}
                  iconSize={20}
                  iconWidth={40}
                  inputPadding={16}
                  onChangeText={text => {
                    this.setState({capbac: text});
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
                  label={'Đơn Vị'}
                  iconClass={FontAwesomeIcon}
                  iconName={'university'}
                  iconColor={'#4285f4'}
                  iconSize={20}
                  iconWidth={40}
                  inputPadding={16}
                  onChangeText={text => {
                    this.setState({donvi: text});
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
                    this._regPA();
                  }}>
                  <Text style={{color: 'white', fontSize: 16}}>Đăng Ký</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </>
        )}
      </SafeAreaView>
    );
  }
}
