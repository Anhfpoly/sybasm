import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Welcome from '../screens/Welcome';
import AddRecord from '../screens/AddRecord';
import History from '../screens/History';
import Login from '../screens/Login';
import Notifications from '../screens/Notifications';
import Police from '../screens/Police';
import Profile from '../screens/Profile';
import Treasury from '../screens/Treasury';

const AddRecordStack = createStackNavigator({
  AddRecord: {
    screen: AddRecord,
  },
});
const HistoryStack = createStackNavigator({
  History: History,
});
const LoginStack = createStackNavigator({
  Login: Login,
});
const NotificationsStack = createStackNavigator({
  Notifications: Notifications,
});
const PoliceStack = createStackNavigator({
  Police: Police,
});
const ProfileStack = createStackNavigator({
  Profile: Profile,
});
const TreasuryStack = createStackNavigator({
  Treasury: Treasury,
});

//Chủ Phương Tiện
const VehicleOwnerNavigation = createMaterialBottomTabNavigator(
  {
    AddRecordStack: {
      screen: AddRecordStack,
      navigationOptions: {
        tabBarLabel: 'Biên Bản',
        tabBarColor: '#fff',
        tabBarIcon: <Entypo name={'plus'} size={20} color="#4285f4"></Entypo>,
      },
    },
    HistoryStack: {
      screen: HistoryStack,
      navigationOptions: {
        tabBarLabel: 'Lịch Sử',
        tabBarColor: '#fff',
        tabBarIcon: (
          <Entypo name={'back-in-time'} size={20} color="#4285f4"></Entypo>
        ),
      },
    },
    NotificationsStack: {
      screen: NotificationsStack,
      navigationOptions: {
        tabBarLabel: 'Thông báo',
        tabBarColor: '#fff',
        tabBarIcon: (
          <Entypo name={'notification'} size={20} color="#4285f4"></Entypo>
        ),
      },
    },
    PoliceStack: {
      screen: PoliceStack,
      navigationOptions: {
        tabBarLabel: 'Giao thông',
        tabBarColor: '#fff',
        tabBarIcon: (
          <FontAwesome5
            name={'dove'}
            size={20}
            color="#4285f4"></FontAwesome5>
        ),
      },
    },
    ProfileStack: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: 'Chủ xe',
        tabBarColor: '#fff',
        tabBarIcon: <MaterialCommunityIcons name={'motorbike'} size={26} color="#4285f4"></MaterialCommunityIcons>,
      },
    },
    TreasuryStack: {
      screen: TreasuryStack,
      navigationOptions: {
        tabBarLabel: 'Kho bạc',
        tabBarColor: '#fff',
        tabBarIcon: <FontAwesome name={'bank'} size={18} color="#4285f4"></FontAwesome>,
      },
    },
  },
  {
    activeColor: '#4285f4',
    inactiveColor: '#3e2465',
    barStyle: {backgroundColor: '#694fad'},
  },
);

const SwitchNav = createSwitchNavigator({
  Login: {
    screen: Login,
  },
  VehicleOwner: VehicleOwnerNavigation,
});

const AppContainer = createAppContainer(SwitchNav);
export default AppContainer;
