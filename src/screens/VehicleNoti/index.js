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
  AsyncStorage,
} from 'react-native';
import {TextInput, Header} from '../../components';
import database from '@react-native-firebase/database';
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
    isnopphat: false,
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
    phonecs: '',
    phigiaodich: '0',
    loaiphuongtien: '',
    danhsachchuxe: [],

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
    idchuxe: '',
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
  _currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' đ';
  }
  _updateData = async status => {
    const ref = database().ref('records/' + this.state.itemId);
    ref.set({
      mabienban: this.state.mabienban,
      nguoivipham: this.state.nguoivipham,
      loaiphuongtien: this.state.loaiphuongtien,
      dienthoai: this.state.dienthoai,
      loivipham: this.state.loivipham,
      tienphat: this.state.tienphat,
      ngaygio: this.state.ngaygio,
      bienso: this.state.bienso,
      vitri: this.state.vitri,
      nguoilap: this.state.nguoilap,
      ghichu: this.state.ghichu,
      trangthai: status,
      capbac: this.state.capbac,
      donvi: this.state.donvi,
      phonecs: this.state.phonecs,
      phigiaodich: this.state.phigiaodich,
    });
  };
  _updateWallet = async value => {
    const ref = database().ref('vehicles/' + this.state.idchuxe);
    ref.set({
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
      vitien: value,
    });
  };

  _currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' đ';
  }
  _getDSChuXe = value => {
    const ref = database().ref('vehicles');
    ref.on('value', snapshot => {
      let danhsachchuxe = [];
      snapshot.forEach(function(childSnapshot) {
        let key = childSnapshot.key;
        var childData = childSnapshot.val();
        danhsachchuxe.push({id: key, ...childData});
      });
      let filtered = danhsachchuxe.filter(item =>
        item.dienthoai.toLowerCase().includes(value.toLowerCase()),
      );
      this.setState({
        danhsachchuxe: filtered,
        idchuxe: filtered[0].id,
        sogiay: filtered[0].sogiay,
        chuxe: filtered[0].chuxe,
        dienthoai: filtered[0].dienthoai,
        diachi: filtered[0].diachi,
        loaixe: filtered[0].loaixe,
        loaiphuongtien: filtered[0].loaiphuongtien,
        mauxe: filtered[0].mauxe,
        bienso: filtered[0].bienso,
        sokhung: filtered[0].sokhung,
        somay: filtered[0].somay,
        ngaycap: filtered[0].ngaycap,
        noicap: filtered[0].noicap,
        loaitk: 'cx',
        vitien: filtered[0].vitien,
      });
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
        item.dienthoai.toLowerCase().includes(value.toLowerCase()),
      );
      console.log(filtered);
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
  _huy() {
    this.setState({isnopphat: false});
  }
  _thanhtoan() {
    this.setState({isnopphat: false});
    this._updateData('Đã nộp phạt');
    let sodu =
      Number(this.state.vitien) -
      (Number(this.state.tienphat) + Number(this.state.phigiaodich));
    this._updateWallet(sodu);
    alert('Nộp phạt thành công!');
  }
  _nopphat() {
    this.setState({visible: false, isnopphat: true});
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
                    this.setState(
                      {
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
                        phonecs: item.phonecs,
                        loaiphuongtien: item.loaiphuongtien,
                        phigiaodich:
                          item.loaiphuongtien === 'Xe máy' ? 3000 : 6000,
                      },
                      () => this._getDSChuXe(this.state.dienthoai),
                    );
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
                    {this._currencyFormat(Number(item.tienphat))}
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
                    this.state.trangthai !== 'Đã nộp phạt' && (
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
                    )
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

              <View>
                <Dialog
                  visible={this.state.isnopphat}
                  onTouchOutside={() => {
                    this.setState({isnopphat: false});
                  }}
                  footer={
                    <DialogFooter>
                      <>
                        <DialogButton
                          text="Huỷ"
                          onPress={() => {
                            this._huy();
                          }}
                        />
                        <DialogButton
                          text="Xác Nhận"
                          onPress={() => {
                            this._thanhtoan();
                          }}
                        />
                      </>
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
                        CHUYỂN TIỀN VỀ KHO BẠC
                      </Text>
                      <View>
                        <View style={styles.infoRow}>
                          <Text style={{color: '#4285f4', fontWeight: 'bold'}}>
                            Ngân hàng No&PTNT Chi nhánh Tây Sài Gòn
                          </Text>
                        </View>
                        <View style={styles.infoRow}>
                          <Text style={{color: '#4285f4', fontWeight: 'bold'}}>
                            Số tài khoản
                          </Text>
                          <Text style={styles.infoDetail}>
                            6789 6789 6789 6789
                          </Text>
                        </View>
                        <View style={styles.infoRow}>
                          <Text style={{color: '#4285f4', fontWeight: 'bold'}}>
                            Số tiền
                          </Text>
                          <Text style={styles.infoDetail}>
                            {this._currencyFormat(Number(this.state.tienphat))}
                          </Text>
                        </View>
                        <View style={styles.infoRow}>
                          <Text style={{color: '#4285f4', fontWeight: 'bold'}}>
                            Nội dung
                          </Text>
                          <Text style={styles.infoDetail}>
                            {'Nộp phạt biên bản số '}
                            {this.state.mabienban}
                          </Text>
                        </View>
                        <View style={styles.infoRow}>
                          <Text style={{color: '#4285f4', fontWeight: 'bold'}}>
                            Phí giao dịch
                          </Text>
                          <Text style={styles.infoDetail}>
                          {this._currencyFormat(Number(this.state.phigiaodich))}
                          </Text>
                        </View>
                      </View>
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

  infoRow: {
    borderBottomColor: 'silver',
    borderBottomWidth: 1,
    marginTop: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
});
