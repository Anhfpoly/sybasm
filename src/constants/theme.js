import {StyleSheet, Dimensions} from 'react-native';
var {height, width} = Dimensions.get('window');
export const sizes = {
  textBase: 14,
};

export const colors = {
  white: '#fff',
  yellow: '#FF9800',
  red: '#FF0000',
  blue: '#11116B',
  lightBlue: '#8684C4',
  lightGreen: '#ADD578',
  gray: '#929798',
  lightGray: '#E8EEEF',
  green: '#31BB62',
  black: '#000',
  primary: '#4285f4',
  orangered: '#ff4800',
};
export const fonts = {
  light: 'Roboto-Light',
  medium: 'Roboto-Medium',
  regular: 'Roboto-Regular',
  thin: 'Roboto-Thin',
  bold: 'Roboto-Bold',
  black: 'Roboto-Black',
};

const header = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    height: 56,
    flexDirection: 'row',
  },
  headerTitle: {
    color: colors.white,
    alignSelf: 'center',
    fontSize: 21,
    textAlign: 'center',
    fontFamily: fonts.bold,
    alignItems: 'center',
    flex: 1,
  },
  heartIcon: {
    tintColor: colors.white,
    margin: 10,
  },
  backIcon: {
    position: 'absolute',
    marginVertical: 15,
    tintColor: colors.white,
    left: 10,
  },
  menuDrawLayer: {
    tintColor: colors.white,
    position: 'absolute',
    margin: 10,
  },
  onBackIcon: {
    padding: 25,
  },
});
export default theme = {
  header,
};
