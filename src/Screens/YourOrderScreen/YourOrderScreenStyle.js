import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#FFFFFF',
    },
    ImgItem: {
      width: '24%',
      height: 100,
      marginLeft: 10,
      marginTop: 10,
      borderRadius: 10,
      backgroundColor: 'red',
    },
  
    Header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: 60,
      borderBottomWidth: 0.5,
      borderBottomColor: 'black',
    },
    ViewImg: {
      flexDirection: 'row',
    },
    viewText: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    textHead: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      fontSize: 24,
      fontWeight: '700',
      color: '#000000',
      fontFamily : 'Inter-Bold'
    },
  
    textHeadAddress: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      fontSize: 13,
      fontWeight: '300',
    },
    item: {
      width: '100%',
      height: 180,
      borderBottomWidth: 10,
      marginTop: 8,
      borderRadius: 7,
      backgroundColor: '#FFFFFF',
      borderColor: '#F2F2F2',
    },
  
    Orders: {
      width: '76%',
      padding: 10,
    },
    viewColorSize: {
      marginTop: 5,
      paddingLeft: 5,
      flexDirection: 'row',
      backgroundColor: '#EFEFEF',
      width: 120,
    },
    viewStatus: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  
    textNamePr: {
      fontSize: 19,
      fontWeight: '500',
      color: 'black',
      flexWrap: 'wrap',
    },
    textColor: {
      fontSize: 14,
      fontWeight: 'normal',
      color: 'black',
    },
    textSize: {
      fontSize: 14,
      fontWeight: 'normal',
      color: 'black',
    },
    textPriceNew: {
      fontSize: 19,
      fontWeight: 'bold',
      color: 'black',
      marginTop: 8,
    },
    d: {
      textDecorationLine: 'underline',
    },
  
    textPriceOld: {
      fontSize: 14,
      textDecorationLine: 'line-through',
    },
  
    textNone: {
      fontSize: 14,
      fontWeight: '600',
      color: 'black',
    },
    textStatus: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'red',
      marginRight: 10,
    },
  });