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
import AsyncStorage from '@react-native-community/async-storage';

export default class History extends Component {
  static navigationOptions = {header: null};
  state = {
    danhsachvipham: [],
    userName: 'abcada',
  };
  componentDidMount() {
    this._saveStorage("TEO");
    this._getUserName();
  }
  _saveStorage = async data => {
    try {
      await AsyncStorage.setItem('username', data);
      alert(data);
    } catch (error) {
      // Error saving data
    }
  };
  _getUserName = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        this.setState({userName: value});
        alert(this.state.userName);
        this._getDSViPham(this.state.userName);
      }
    } catch (error) {}
    alert(this.state.userName);
  };
  filterData = value => {
    let filtered = Object.values(this.state.danhsachvipham).filter(item =>
      item.nguoilap.toLowerCase().includes(value.toLowerCase()),
    );
    this.setState({filtered});
  };
  _getDSViPham = value => {
    const ref = database().ref('records');
    ref.on('value', snapshot => {
      let danhsachvipham = [];
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        danhsachvipham.push(childData);
      });
      console.log(danhsachvipham);
      let filtered = Object.values(danhsachvipham).filter(item =>
        item.nguoilap.toLowerCase().includes(value.toLowerCase()),
      );
      this.setState({danhsachvipham: filtered});
    });
  };
  render() {
    return (
      <SafeAreaView>
        <Header title={'Danh sách biên bản vi phạm'} hideBars={true} />
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
                      bienso: item.bienso,
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
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
