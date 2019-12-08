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

export default class AddRecord extends Component {
  static navigationOptions = {header: null};
  state = {
    irecord: '',
    mabienban: '',
    nguoivipham: '',
    dienthoai: '',
    loivipham: '',
    tienphat: '',
    ngaygio: '',
    bienso: '',
    vitri: '',
    nguoilap: '',
    ghichu: '',
    trangthai: 'Không Nhận Lỗi',
  };
  componentDidMount() {
    this._getMaBienBan();
  }
  _getMaBienBan = async () => {
    const ref = database().ref('irecord');
    const snapshot = await ref.once('value');
    let mabb = snapshot.val() + 1;
    if (mabb <= 9) {
      mabb = '00000' + mabb;
    } else if (mabb <= 99) {
      mabb = '0000' + mabb;
    } else if (mabb <= 999) {
      mabb = '000' + mabb;
    } else if (mabb <= 9999) {
      mabb = '00' + mabb;
    } else if (mabb <= 99999) {
      mabb = '0' + mabb;
    } else if (mabb <= 999999) {
      mabb = mabb;
    }
    this.setState({
      mabienban: mabb,
    });
  };
  _setIndexRecord = async () => {
    const ref = database().ref('irecord');
    const snapshot = await ref.once('value');
    const i = snapshot.val() + 1;
    await database()
      .ref('irecord')
      .set(i);
  };
  _getData = async () => {
    const ref = database().ref('vehicles');
    const snapshot = await ref.once('value');
    alert(snapshot.val());
  };
  _setData = async () => {
    const ref = database().ref('records');
    if (
      this.state.mabienban === '' ||
      this.state.nguoivipham === '' ||
      this.state.dienthoai === '' ||
      this.state.loivipham === '' ||
      this.state.tienphat === '' ||
      this.state.ngaygio === '' ||
      this.state.bienso === '' ||
      this.state.vitri === '' ||
      this.state.nguoilap === '' ||
      this.state.ghichu === '' ||
      this.state.trangthai === ''
    ) {
      alert('Vui lòng nhập đủ thông tin!');
    } else {
      ref.push({
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
        trangthai: this.state.trangthai,
      });
      alert('Lập hồ sơ vi phạm thành công!');
      this._setIndexRecord();
      this.setState({
        mabienban: '',
        nguoivipham: '',
        dienthoai: '',
        loivipham: '',
        tienphat: '',
        ngaygio: '',
        bienso: '',
        vitri: '',
        nguoilap: '',
        ghichu: '',
        trangthai: ''
      });
    }
  };
  _regVehicle() {
    this._setData();
  }
  render() {
    return (
      <SafeAreaView>
        <Header title={'Lập biên bản vi phạm'} hideBars={true} />
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
              style={{lineHeight: 40, textAlign: 'center', color: '#ff4800'}}>
              Mã Biên Bản: {this.state.mabienban}
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
              label={'Người Vi Phạm'}
              iconClass={FontAwesomeIcon}
              iconName={'university'}
              iconColor={'#4285f4'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              onChangeText={text => {
                this.setState({nguoivipham: text});
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
              label={'Lỗi Vi Phạm'}
              iconClass={FontAwesomeIcon}
              iconName={'university'}
              iconColor={'#4285f4'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              onChangeText={text => {
                this.setState({loivipham: text});
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
              label={'Tiền Phạt'}
              iconClass={FontAwesomeIcon}
              iconName={'university'}
              iconColor={'#4285f4'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              onChangeText={text => {
                this.setState({tienphat: text});
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
              label={'Ngày Giờ'}
              iconClass={FontAwesomeIcon}
              iconName={'university'}
              iconColor={'#4285f4'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              onChangeText={text => {
                this.setState({ngaygio: text});
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
              label={'Xe Vi Phạm'}
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
              marginBottom: 12,
            }}>
            <Fumi
              label={'Nơi Vi Phạm'}
              iconClass={FontAwesomeIcon}
              iconName={'university'}
              iconColor={'#4285f4'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              onChangeText={text => {
                this.setState({vitri: text});
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
              label={'Người Lập Biên Bản'}
              iconClass={FontAwesomeIcon}
              iconName={'university'}
              iconColor={'#4285f4'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              onChangeText={text => {
                this.setState({nguoilap: text});
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
              label={'Ghi Chú'}
              iconClass={FontAwesomeIcon}
              iconName={'university'}
              iconColor={'#4285f4'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              onChangeText={text => {
                this.setState({ghichu: text});
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
              <Text style={{color: 'white', fontSize: 16}}>Xác Nhận</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
