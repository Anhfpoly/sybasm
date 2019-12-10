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
    trangthai: 'Chưa xác nhận',
    vitri: '',
    itemId: '',
  };
  componentDidMount() {
    this._getDSViPham('61D');
  }
  _updateData = async status => {
    const ref = database().ref('records/' + this.state.itemId);
    ref.set({
      mabienban: this.state.mabienban,
      nguoivipham: this.state.nguoivipham,
      dienthoai: this.state.dienthoai,
      loivipham: this.state.loivipham,
      tienphat: this.state.tienphat,
      ngaygio: this.state.ngaygio,
      bienso: this.state.bienso,
      vitri: this.state.vitri,
      nguoilap: this.state.nguoilap,
      ghichu: this.state.ghichu,
      trangthai: status,
    });
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
        item.bienso.toLowerCase().includes(value.toLowerCase()),
      );
      // console.log(filtered)
      this.setState({danhsachvipham: filtered});
    });
  };
  _sai() {
    this.setState({visible: false});
    this._updateData('Sai lỗi');
  }
  _dung() {
    this.setState({visible: false});
    this._updateData('Đúng lỗi');
  }
  _nopphat() {
    this.setState({visible: false});
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
                paddingBottom: 60,
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
                        color: item.trangthai === 'Sai lỗi' ? 'red' : 'green',
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
                      {this.state.trangthai === 'Đúng lỗi' ? (
                        <DialogButton
                          text="Nộp Phạt"
                          onPress={() => {
                            this._nopphat();
                          }}
                        />
                      ) : (
                        <>
                          <DialogButton
                            text="Sai Lỗi"
                            onPress={() => {
                              this._sai();
                            }}
                          />
                          <DialogButton
                            text="Đúng Lỗi"
                            onPress={() => {
                              this._dung();
                            }}
                          />
                        </>
                      )}
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
