import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {TextInput, Header} from '../../components';
import database from '@react-native-firebase/database';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Fumi} from 'react-native-textinput-effects';
import Geolocation from 'react-native-geolocation-service';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {LOIVIPHAM} from '../../data/loi';
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
    trangthai: 'Chưa xác nhận',
    danhsachloi: LOIVIPHAM,
    filtered: [],
    danhsachxe: [],
    filterxe: [],
    dscs: [],
    phonenum: '',
    capbac: '',
    donvi: '',
    phonecs: '',
    loaiphuongtien: '',
  };
  componentDidMount() {
    this.unsubcribleFocus = this.props.navigation.addListener(
      'didFocus',
      () => {
        this._getDSXe();
        this._getDSCS(this.state.phonenum);
        this.getNgayGio();
        this.getLocation();
        this._getMaBienBan();
      },
    );
  }

  componentWillUnmount() {
    this.unsubcribleFocus;
  }
  _getDSCS = value => {
    const ref = database().ref('polices');
    ref.on('value', snapshot => {
      let dscs = [];
      snapshot.forEach(function(childSnapshot) {
        let key = childSnapshot.key;
        var childData = childSnapshot.val();
        dscs.push({id: key, ...childData});
      });
      let filtered = dscs.filter(item =>
        item.dienthoai.toLowerCase().includes(value.toLowerCase()),
      );
      console.log(filtered);
      this.setState({
        dscs: filtered,
        nguoilap: filtered[0].hoten,
        capbac: filtered[0].capbac,
        phonecs: filtered[0].dienthoai,
        donvi: filtered[0].donvi,
      });
    });
  };
  _getUserName = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        this.setState({phonenum: value});
      }
    } catch (error) {}
  };
  filterData = () => {
    let filtered = LOIVIPHAM.filter(item =>
      item.loi.toLowerCase().includes(this.state.loivipham.toLowerCase()),
    );
    this.setState({filtered});
  };
  filterXe = value => {
    let filterxe = Object.values(this.state.danhsachxe).filter(item =>
      item.bienso.toLowerCase().includes(value.toLowerCase()),
    );
    this.setState({filterxe});
  };
  _getDSXe = async () => {
    const ref = database().ref('vehicles');
    const snapshot = await ref.once('value');
    this.setState({danhsachxe: snapshot.val()});
  };
  hasLocationPermission = async () => {
    if (
      Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)
    ) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  getAddress = async (lat, long) => {
    return fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=58f28df91776444185a70ddc4daac213&no_annotations=1&language=vi`,
    )
      .then(response => response.json())
      .then(responseJson => {
        return responseJson.results[0].formatted;
      })
      .catch(error => {
        console.error(error);
      });
  };
  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) return;
    Geolocation.getCurrentPosition(
      async position => {
        let addr = await this.getAddress(
          position.coords.latitude,
          position.coords.longitude,
        );
        this.setState({vitri: addr});
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 50,
        forceRequestLocation: true,
      },
    );
  };
  _getMaBienBan = async () => {
    const ref = database().ref('irecord');
    ref.on('value', snapshot => {
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
        phonecs: this.state.phonecs,
        donvi: this.state.donvi,
        capbac: this.state.capbac,
        loaiphuongtien: this.state.loaiphuongtien,
      });
      alert('Lập hồ sơ vi phạm thành công!');
      this._setIndexRecord();
      this.setState({
        mabienban: '',
        nguoivipham: '',
        dienthoai: '',
        loivipham: '',
        tienphat: '',
        bienso: '',
        ghichu: '',
        trangthai: '',
      });
    }
  };

  getNgayGio = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();
    if (date < 10) {
      date = '0' + date;
    }
    if (month < 10) {
      month = '0' + month;
    }
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (min < 10) {
      min = '0' + min;
    }
    if (sec < 10) {
      sec = '0' + sec;
    }
    this.setState({
      ngaygio:
        'Ngày ' +
        date +
        '/' +
        month +
        '/' +
        year +
        ' lúc ' +
        hours +
        ':' +
        min +
        ':' +
        sec,
    });
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
              style={{
                lineHeight: 40,
                textAlign: 'center',
                color: '#ff4800',
                fontSize: 20,
              }}>
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
              label={'Xe Vi Phạm'}
              iconClass={SimpleLineIcons}
              iconName={'pencil'}
              iconColor={'#4285f4'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              value={this.state.bienso}
              onChangeText={text => {
                this.setState({bienso: text}, () => this.filterXe(text));
              }}
            />
          </View>
          {this.state.filterxe.length > 0 && (
            <View
              style={{
                borderColor: '#4285f4',
                borderWidth: 1,
                borderRadius: 12,
                marginBottom: 3,
                padding: 6,
              }}>
              {this.state.filterxe.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    this.setState({
                      bienso: item.bienso,
                      dienthoai: item.dienthoai,
                      nguoivipham: item.chuxe,
                      loaiphuongtien: item.loaiphuongtien,
                      filterxe: [],
                    });
                  }}>
                  <Text
                    style={{
                      borderColor: '#4285f4',
                      borderWidth: 1,
                      borderRadius: 12,
                      marginBottom: 3,
                      padding: 6,
                    }}>
                    {item.bienso}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <View
            style={{
              borderColor: '#4285f4',
              borderWidth: 1,
              borderRadius: 12,
              marginBottom: 3,
            }}>
            <Fumi
              label={'Người Vi Phạm'}
              iconClass={SimpleLineIcons}
              iconName={'pencil'}
              iconColor={'#4285f4'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              value={this.state.nguoivipham}
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
              iconClass={SimpleLineIcons}
              iconName={'pencil'}
              iconColor={'#4285f4'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              value={this.state.dienthoai}
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
              iconClass={SimpleLineIcons}
              iconName={'pencil'}
              iconColor={'#4285f4'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              value={this.state.loivipham}
              onChangeText={text => {
                this.setState({loivipham: text}, () => this.filterData());
              }}
            />
          </View>
          {this.state.filtered.length > 0 && (
            <View
              style={{
                borderColor: '#4285f4',
                borderWidth: 1,
                borderRadius: 12,
                marginBottom: 3,
                padding: 6,
              }}>
              {this.state.filtered.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    this.setState({
                      tienphat: item.mucphat,
                      loivipham: item.loi,
                      filtered: [],
                    });
                  }}>
                  <Text
                    style={{
                      borderColor: '#4285f4',
                      borderWidth: 1,
                      borderRadius: 12,
                      marginBottom: 3,
                      padding: 6,
                    }}>
                    {item.loi}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <View
            style={{
              borderColor: '#4285f4',
              borderWidth: 1,
              borderRadius: 12,
              marginBottom: 3,
            }}>
            <Fumi
              label={'Tiền Phạt'}
              iconClass={SimpleLineIcons}
              iconName={'pencil'}
              iconColor={'#4285f4'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              value={this.state.tienphat}
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
              iconClass={SimpleLineIcons}
              iconName={'pencil'}
              iconColor={'#4285f4'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              value={this.state.ngaygio}
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
              marginBottom: 12,
            }}>
            <Fumi
              label={'Nơi Vi Phạm'}
              iconClass={SimpleLineIcons}
              iconName={'pencil'}
              iconColor={'#4285f4'}
              iconSize={20}
              iconWidth={40}
              value={this.state.vitri}
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
              iconClass={SimpleLineIcons}
              iconName={'pencil'}
              iconColor={'#4285f4'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              value={this.state.nguoilap}
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
              iconClass={SimpleLineIcons}
              iconName={'pencil'}
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
