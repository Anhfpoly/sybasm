import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
        tabBarColor: '#4285f4',
        tabBarIcon: <Entypo name={'book'} size={20} color="#fff"></Entypo>,
      },
    },
    HistoryStack: {
      screen: HistoryStack,
      navigationOptions: {
        tabBarLabel: 'Lịch Sử',
        tabBarColor: '#4285f4',
        tabBarIcon: <Entypo name={'book'} size={20} color="#fff"></Entypo>,
      },
    },
    NotificationsStack: {
      screen: NotificationsStack,
      navigationOptions: {
        tabBarLabel: 'Thông báo',
        tabBarColor: '#4285f4',
        tabBarIcon: <Entypo name={'book'} size={20} color="#fff"></Entypo>,
      },
    },
    PoliceStack: {
      screen: PoliceStack,
      navigationOptions: {
        tabBarLabel: 'Giao thông',
        tabBarColor: '#4285f4',
        tabBarIcon: <Entypo name={'book'} size={20} color="#fff"></Entypo>,
      },
    },
    ProfileStack: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: 'Chủ xe',
        tabBarColor: '#4285f4',
        tabBarIcon: <Entypo name={'book'} size={20} color="#fff"></Entypo>,
      },
    },
    TreasuryStack: {
      screen: TreasuryStack,
      navigationOptions: {
        tabBarLabel: 'Kho bạc',
        tabBarColor: '#4285f4',
        tabBarIcon: <Entypo name={'book'} size={20} color="#fff"></Entypo>,
      },
    },
  },
  {
    activeColor: '#f0edf6',
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
