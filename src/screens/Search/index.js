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
import {LOIVIPHAM} from '../../data/loi';

export default class Search extends Component {
  static navigationOptions = {header: null};
  state = {
    filtered: [],
    danhsachloi: LOIVIPHAM,
  };
  componentDidMount() {}
  filterData = () => {
    let filtered = LOIVIPHAM.filter(item =>
      item.loi.toLowerCase().includes(this.state.loivipham.toLowerCase()),
    );
    this.setState({filtered});
  };
  render() {
    return (
      <SafeAreaView>
        <Header title={'Tra cứu luật giao thông'} hideBars={true} />
        <ScrollView
          style={{
            marginHorizontal: 2,
            marginVertical: 2,
            paddingBottom: 60,
          }}>
          <View
            style={{
              borderColor: '#4285f4',
              borderWidth: 1,
              borderRadius: 12,
              marginBottom: 3,
            }}>
            <Fumi
              label={'Nhập nội dung tra cứu'}
              iconClass={FontAwesomeIcon}
              iconName={'search'}
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
                marginBottom: 60,
                padding: 6,
              }}>
              {this.state.filtered.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    borderColor: '#4285f4',
                    borderWidth: 1,
                    borderRadius: 12,
                    marginBottom: 3,
                    padding: 6,
                  }}
                  onPress={() => {
                    this.setState({
                      loivipham: item.loi,
                      tienphat: item.mucphat,
                      chitiet: item.chitiet,
                    });
                  }}>
                  <Text style={{color: '#ff4800'}}>
                    {'Lỗi: '}
                    {item.loi}
                  </Text>
                  <Text style={{color: 'green'}}>{'Chi tiết lỗi:'}</Text>
                  <Text>{item.chitiet}</Text>
                  <Text style={{color: 'green'}}>{'Mức phạt:'}</Text>
                  <Text>{item.mucphat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
