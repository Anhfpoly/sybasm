import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
  PermissionsAndroid,
  AsyncStorage,
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

export default class Notifications extends Component {
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
    trangthai: 'Chưa xác nhận',
    vitri: '',
    itemId: '',
    capbac: '',
    donvi: '',
  };
  componentDidMount() {
    this._getUserName();
  }
  _getUserName = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        this._getDSViPham(value);
      }
    } catch (error) {}
  };
  filterData = value => {
    let filtered = Object.values(this.state.danhsachvipham).filter(item =>
      item.phonecs.toLowerCase().includes(value.toLowerCase()),
    );
    this.setState({filtered});
  };
  _getDSViPham = value => {
    const ref = database().ref('records');
    ref.on('value', snapshot => {
      let danhsachvipham = [];
      snapshot.forEach(function(childSnapshot) {
        let key = childSnapshot.key;
        var childData = childSnapshot.val();
        danhsachvipham.push({id: key, ...childData});
      });
      let filtered = danhsachvipham.filter(item =>
        item.phonecs.toLowerCase().includes(value.toLowerCase()),
      );
      // console.log(filtered)
      this.setState({danhsachvipham: filtered});
    });
  };
  _currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' đ';
  }
  render() {
    return (
      <SafeAreaView>
        <Header title={'Thông Báo'} hideBars={true} />
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
                marginBottom: 60,
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
                      itemId: item.id,
                      capbac: item.capbac,
                      donvi: item.donvi,
                    });
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{color: '#ff4800', fontSize: 16}}>
                    {'Biên bản xử phạt số: '}
                    {item.mabienban}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text>{'Đã được người vi phạm xác nhận là: '}</Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: item.trangthai === 'Sai lỗi' ? 'red' : 'green',
                      }}>
                      {item.trangthai}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <View>
            <Dialog
              visible={this.state.visible}
              onTouchOutside={() => {
                this.setState({visible: false});
              }}
              dialogAnimation={
                new ScaleAnimation({
                  slideFrom: 'bottom',
                })
              }>
              <DialogContent>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
                  <Text style={{fontSize: 12}}>Ngày: {this.state.ngaygio}</Text>
                  <Text style={{fontSize: 12}}>Tại: {this.state.vitri}</Text>
                  <Text style={{fontSize: 12}}>
                    {'Chúng tôi gồm: '}
                    {this.state.nguoilap}
                  </Text>
                  <Text style={{fontSize: 12}}>
                    {'Cấp bậc, chức vụ: '}
                    {this.state.capbac}
                  </Text>
                  <Text style={{fontSize: 12}}>
                    {'Đơn vị: '}
                    {this.state.donvi}
                  </Text>
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
                    {'Nội dung vi phạm: '}
                    {this.state.loivipham}
                  </Text>
                  <Text style={{fontSize: 12}}>
                    {'Số tiền nộp phạt: '}
                    {this._currencyFormat(Number(this.state.tienphat))}
                  </Text>
                </View>
              </DialogContent>
            </Dialog>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
