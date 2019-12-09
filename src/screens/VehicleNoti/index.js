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
import {bold} from 'ansi-colors';

export default class VehicleNoti extends Component {
  static navigationOptions = {header: null};
  state = {
    danhsachvipham: [],
    visible: false,
    mabienban: '',
  };
  showDialog = () => {
    this.setState({visible: true});
  };
  componentDidMount() {
    this._getDSViPham('61D');
  }
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
                    this.setState({visible: true, mabienban: item.mabienban});
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
                      <Text style={{fontSize: 12}}>Ngày: </Text>
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
