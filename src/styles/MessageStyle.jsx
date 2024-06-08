import {StyleSheet} from 'react-native';
import COLORS from '../constants/colors';
export const Container = StyleSheet.create({
  flex: 1,
  backgroundColor: '#FFFFFF',
  paddingLeft: 20,
  paddingRight: 20,
  alignItems: 'center',
});

export const Card = StyleSheet.create({
  width: '100%',
});

export const UserInfo = StyleSheet.create({
  flexDirection: 'row',
  justifyContent: 'space-between',
});
export const UserImgWrapper = StyleSheet.create({
  paddingTop: 15,
  paddingBottom: 15,
});

export const UserImg = StyleSheet.create({
  width: 50,
  height: 50,
  borderRadius: 25,
});

export const TextSection = StyleSheet.create({
  flexDirection: 'column',
  justifyContent: 'center',
  padding: 15,
  paddingLeft: 0,
  marginLeft: 10,
  width: 300,
  borderBottomWidth: 1,
  borderBottomColor: '#cccccc',
});

export const UserInfoText = StyleSheet.create({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 5,
});

export const UserName = StyleSheet.create({
  fontSize: 14,
  fontWeight: 'bold',
});

export const PostTime = StyleSheet.create({
  fontSize: 12,
  color: COLORS.palette,
});

export const MessageText = StyleSheet.create({
  fontSize: 14,
  color: '#333333',
});
