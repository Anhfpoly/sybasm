import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
import {TextInput, Header} from '../../components';
import database from '@react-native-firebase/database';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Fumi} from 'react-native-textinput-effects';
import Dialog, {
  DialogFooter,
  DialogButton,
  ScaleAnimation,
  DialogContent,
} from 'react-native-popup-dialog';

export default class VehicleNoti extends Component {
  static navigationOptions = {header: null};
  state = {
    danhsachvipham: [],
    visible: false,
    mabienban: '',
    bienso: '',
    dienthoai: '',
    ghichu: '',
    loivipham: '',
    ngaygio: '',
    nguoilap: '',
    nguoivipham: '',
    tienphat: '',
    trangthai: 'Chưa đúng lỗi',
    vitri: '',
  };
  componentDidMount() {
    this._getDSViPham('61D');
  }
  _updateData = async () => {
    const ref = database().ref('vehicles');
    if (
      this.state.chuxe === '' ||
      this.state.dienthoai === '' ||
      this.state.diachi === '' ||
      this.state.loaixe === '' ||
      this.state.mauxe === '' ||
      this.state.bienso === '' ||
      this.state.sokhung === '' ||
      this.state.somay === '' ||
      this.state.ngaycap === '' ||
      this.state.noicap === ''
    ) {
      alert('Vui lòng nhập đủ thông tin!');
    } else {
      ref.update({
        chuxe: this.state.chuxe,
        dienthoai: this.state.dienthoai,
        diachi: this.state.diachi,
        loaixe: this.state.loaixe,
        mauxe: this.state.mauxe,
        bienso: this.state.bienso,
        sokhung: this.state.sokhung,
        somay: this.state.somay,
        ngaycap: this.state.ngaycap,
        noicap: this.state.noicap,
      });
      alert('Xác nhận thành công!');
    }
  };
  _getDSViPham = value => {
    const ref = database().ref('records');
    ref.on('value', snapshot => {
      let danhsachvipham = [];
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        danhsachvipham.push(childData);
      });
      let filtered = Object.values(danhsachvipham).filter(item =>
        item.bienso.toLowerCase().includes(value.toLowerCase()),
      );
      this.setState({danhsachvipham: filtered});
    });
  };
  _notidetail(value) {
    alert(value.mabienban);
  }
  render() {
    return (
      <SafeAreaView>
        <Header title={'Thông báo vi phạm'} hideBars={true} />
        <ScrollView
          style={{
            marginHorizontal: 2,
            marginVertical: 2,
            paddingBottom: 60,
          }}>
          {this.state.danhsachvipham.length > 0 && (
            <View
              style={{
                padding: 3,
              }}>
              {this.state.danhsachvipham.map((item, index) => (
                <TouchableOpacity
                  style={{
                    borderColor: '#4285f4',
                    borderWidth: 1,
                    borderRadius: 12,
                    marginBottom: 3,
                    padding: 6,
                  }}
                  key={index}
                  onPress={() => {
                    this.setState({
                      visible: true,
                      mabienban: item.mabienban,
                      bienso: item.bienso,
                      dienthoai: item.dienthoai,
                      ghichu: item.ghichu,
                      loivipham: item.loivipham,
                      ngaygio: item.ngaygio,
                      nguoilap: item.nguoilap,
                      nguoivipham: item.nguoivipham,
                      tienphat: item.tienphat,
                      trangthai: item.trangthai,
                      vitri: item.vitri,
                    });
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{color: '#ff4800', fontSize: 16}}>
                    {'Mã biên bản: '}
                    {item.mabienban}
                  </Text>
                  <Text numberOfLines={1}>
                    {'Lỗi vi phạm: '}
                    {item.loivipham}
                  </Text>
                  <Text numberOfLines={1}>
                    {'Xe vi phạm: '}
                    {item.bienso}
                  </Text>
                  <Text numberOfLines={1}>
                    {'Tiền phạt: '}
                    {item.tienphat}
                  </Text>
                  <Text numberOfLines={1}>
                    {'Thời gian: '}
                    {item.ngaygio}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text>{'Xác nhận: '}</Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        color:
                          item.trangthai === 'Chưa đúng lỗi' ? 'red' : 'green',
                      }}>
                      {item.trangthai}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
              <View>
                <Dialog
                  visible={this.state.visible}
                  onTouchOutside={() => {
                    this.setState({visible: false});
                  }}
                  footer={
                    <DialogFooter>
                      <DialogButton text="Sai" onPress={() => {}} />
                      <DialogButton text="Đúng" onPress={() => {}} />
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
                      <Text style={{marginTop: 10, fontWeight: 'bold'}}>
                        CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM
                      </Text>
                      <Text style={{fontWeight: 'bold'}}>
                        Độc lập - Tự Do - Hạnh Phúc
                      </Text>
                      <Text style={{marginTop: 6}}>{'******'}</Text>
                      <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                        BIÊN BẢN VI PHẠM HÀNH CHÍNH
                      </Text>
                      <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                        Về lĩnh vực giao thông đường bộ
                      </Text>
                    </View>
                    <View style={{marginTop: 10}}>
                      <Text style={{fontSize: 12, color: '#ff4800'}}>
                        {'Mã biên bản: '}
                        {this.state.mabienban}
                      </Text>
                      <Text style={{fontSize: 12}}>
                        Căn cứ: luật xử lý vi phạm hành chính
                      </Text>
                      <Text style={{fontSize: 12}}>
                        Ngày: {this.state.ngaygio}
                      </Text>
                      <Text style={{fontSize: 12}}>
                        Tại: {this.state.vitri}
                      </Text>
                      <Text style={{fontSize: 12}}>Chúng tôi gồm:</Text>
                      <Text style={{fontSize: 12}}>
                        {'1. Lê Văn '}
                        {this.state.nguoilap}
                      </Text>
                      <Text style={{fontSize: 12}}>Cấp bậc, chức vụ:</Text>
                      <Text style={{fontSize: 12}}>
                        Tiến hành lập biên bản vi phạm hành chính với:
                      </Text>
                      <Text style={{fontSize: 12}}>
                        {'Ông(Bà)/Tổ chức: '}
                        {this.state.nguoivipham}
                      </Text>
                      <Text style={{fontSize: 12}}>
                        {'Điện thoại: '}
                        {this.state.dienthoai}
                      </Text>
                      <Text style={{fontSize: 12}}>
                        {'Nội dung vi phạm: \n'}
                        {this.state.loivipham}
                      </Text>
                      <Text style={{fontSize: 12}}>
                        {'Số tiền nộp phạt: \n'}
                        {this.state.tienphat}
                      </Text>
                    </View>
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: 'bold',
                          marginTop: 30,
                          color: 'red'
                        }}>
                        {'Xác nhận những lỗi trên là?'}
                      </Text>
                    </View>
                  </DialogContent>
                </Dialog>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
  },

  closeButtonContainer: {
    position: 'absolute',
    top: 51,
    width: 44,
    height: 44,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },

  closeButton: {
    color: 'white',
    textAlign: 'center',
  },
});
