import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {sizes, fonts, colors} from '../constants/theme';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Welcome from '../screens/Welcome';
import AddRecord from '../screens/AddRecord';
import History from '../screens/History';
import Search from '../screens/Search';
import Login from '../screens/Login';
import Notifications from '../screens/Notifications';
import VehicleNoti from '../screens/VehicleNoti';
import Police from '../screens/Police';
import Profile from '../screens/Profile';
import Treasury from '../screens/Treasury';
import Statistical from '../screens/Statistical';
import Manage from '../screens/Manage';
import RegVehicle from '../screens/RegVehicle';

const AddRecordStack = createStackNavigator({
  AddRecord: {
    screen: AddRecord,
  },
});
const HistoryStack = createStackNavigator({
  History: History,
});
const SearchStack = createStackNavigator({
  Search: Search,
});
const LoginStack = createStackNavigator({
  Login: Login,
});
const NotificationsStack = createStackNavigator({
  Notifications: Notifications,
});
const VehicleNotiStack = createStackNavigator({
  VehicleNoti: VehicleNoti,
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
const ManageStack = createStackNavigator({
  Manage: Manage,
});
const StatisticalStack = createStackNavigator({
  Statistical: Statistical,
});
const RegVehicleStack = createStackNavigator({
  RegVehicle: RegVehicle,
});

//Chủ Phương Tiện
const VehicleOwnerNavigation = createMaterialBottomTabNavigator(
  {
    SearchStack: {
      screen: SearchStack,
      navigationOptions: {
        tabBarLabel: 'Tra Cứu',
        tabBarColor: colors.white,
        tabBarIcon: (
          <Feather name={'search'} size={20} color={colors.primary}></Feather>
        ),
      },
    },
    VehicleNotiStack: {
      screen: VehicleNotiStack,
      navigationOptions: {
        tabBarLabel: 'Thông báo',
        tabBarColor: colors.white,
        tabBarIcon: (
          <Entypo name={'notification'} size={20} color={colors.primary}></Entypo>
        ),
      },
    },
    ProfileStack: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: 'Chủ xe',
        tabBarColor: colors.white,
        tabBarIcon: (
          <MaterialCommunityIcons
            name={'motorbike'}
            size={26}
            color={colors.primary}></MaterialCommunityIcons>
        ),
      },
    },
  },
  {
    initialRouteName: 'VehicleNotiStack',
    activeColor: colors.primary,
    inactiveColor: colors.black,
    shifting: true,
    barStyle: {backgroundColor: colors.white},
  },
);

//Giao Thông
const PoliceNavigation = createMaterialBottomTabNavigator(
  {
    HistoryStack: {
      screen: HistoryStack,
      navigationOptions: {
        tabBarLabel: 'Lịch Sử',
        tabBarColor: colors.white,
        tabBarIcon: (
          <Entypo name={'back-in-time'} size={20} color={colors.primary}></Entypo>
        ),
      },
    },
    NotificationsStack: {
      screen: NotificationsStack,
      navigationOptions: {
        tabBarLabel: 'Thông báo',
        tabBarColor: colors.white,
        tabBarIcon: (
          <Entypo name={'notification'} size={20} color={colors.primary}></Entypo>
        ),
      },
    },
    AddRecordStack: {
      screen: AddRecordStack,
      navigationOptions: {
        tabBarLabel: 'Biên bản',
        tabBarColor: colors.white,
        tabBarIcon: <Entypo name={'plus'} size={26} color={colors.orangered}></Entypo>,
      },
    },
    RegVehicleStack: {
      screen: RegVehicleStack,
      navigationOptions: {
        tabBarLabel: 'Đăng ký',
        tabBarColor: colors.white,
        tabBarIcon: (
          <MaterialCommunityIcons
            name={'account-badge-horizontal-outline'}
            size={20}
            color={colors.primary}></MaterialCommunityIcons>
        ),
      },
    },
    PoliceStack: {
      screen: PoliceStack,
      navigationOptions: {
        tabBarLabel: 'Thông tin',
        tabBarColor: colors.white,
        tabBarIcon: (
          <FontAwesome5 name={'dove'} size={20} color={colors.primary}></FontAwesome5>
        ),
      },
    },
  },
  {
    initialRouteName: 'HistoryStack',
    activeColor: colors.primary,
    inactiveColor: colors.black,
    shifting: true,
    barStyle: {backgroundColor: colors.white},
  },
);

//Kho Bạc
const TreasuryNavigation = createMaterialBottomTabNavigator(
  {
    HistoryStack: {
      screen: HistoryStack,
      navigationOptions: {
        tabBarLabel: 'Lịch sử',
        tabBarColor: colors.white,
        tabBarIcon: (
          <Entypo name={'back-in-time'} size={20} color={colors.primary}></Entypo>
        ),
      },
    },
    NotificationsStack: {
      screen: NotificationsStack,
      navigationOptions: {
        tabBarLabel: 'Thông báo',
        tabBarColor: colors.white,
        tabBarIcon: (
          <Entypo name={'notification'} size={20} color={colors.primary}></Entypo>
        ),
      },
    },
    TreasuryStack: {
      screen: TreasuryStack,
      navigationOptions: {
        tabBarLabel: 'Kho bạc',
        tabBarColor: colors.white,
        tabBarIcon: (
          <FontAwesome name={'bank'} size={18} color={colors.primary}></FontAwesome>
        ),
      },
    },
  },
  {
    initialRouteName: 'NotificationsStack',
    activeColor: colors.primary,
    inactiveColor: colors.black,
    shifting: true,
    barStyle: {backgroundColor: colors.white},
  },
);

//Doanh Nghiệp
const BusinessNavigation = createMaterialBottomTabNavigator(
  {
    ManageStack: {
      screen: ManageStack,
      navigationOptions: {
        tabBarLabel: 'Quản lý',
        tabBarColor: colors.white,
        tabBarIcon: (
          <MaterialCommunityIcons
            name={'account-group'}
            size={20}
            color={colors.primary}></MaterialCommunityIcons>
        ),
      },
    },
    NotificationsStack: {
      screen: NotificationsStack,
      navigationOptions: {
        tabBarLabel: 'Thông báo',
        tabBarColor: colors.white,
        tabBarIcon: (
          <Entypo name={'notification'} size={20} color={colors.primary}></Entypo>
        ),
      },
    },
    StatisticalStack: {
      screen: StatisticalStack,
      navigationOptions: {
        tabBarLabel: 'Thống kê',
        tabBarColor: colors.white,
        tabBarIcon: (
          <FontAwesome
            name={'line-chart'}
            size={20}
            color={colors.primary}></FontAwesome>
        ),
      },
    },
  },
  {
    initialRouteName: 'NotificationsStack',
    activeColor: colors.primary,
    inactiveColor: colors.black,
    shifting: true,
    barStyle: {backgroundColor: colors.white},
  },
);

const SwitchNav = createSwitchNavigator({
  Login: {
    screen: Login,
  },
  VehicleOwner: VehicleOwnerNavigation,
  Police: PoliceNavigation,
  Treasury: TreasuryNavigation,
  Business: BusinessNavigation,
});

const AppContainer = createAppContainer(SwitchNav);
export default AppContainer;
