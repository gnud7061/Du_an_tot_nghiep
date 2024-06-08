import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

 export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    rowContainer2: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    bottomSheet: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 100,
      backgroundColor: '#FFF',
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      elevation: 10,
      justifyContent: 'center', // Thêm dòng này để đẩy bottom sheet xuống dưới
    },
  
    orderButton: {
      backgroundColor: '#FF2271',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
    },
    orderButtonText: {
      color: '#FFF',
      fontWeight: 'bold',
    },
  
    header: {
      height: 50,
      flexDirection: 'row',
      paddingLeft: '5%',
      paddingRight: '5%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    ViewImageProduct: {
      width: '100%',
      height : 350,
      // borderBottomEndRadius: 30,
      // borderBottomStartRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageProduct: {
      width: '100%',
      height: '100%',
      marginTop: '5%',
    },
    infoProduct: {
      width: '100%',
      marginTop: 10,
      paddingLeft: '2%',
    },
    quantity: {
      flexDirection: 'row',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: COLORS.gray,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    btnAddToCard: {
      width: '35%',
      height: 50,
      borderWidth: 1.2,
      borderColor: COLORS.red,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    footer: {
      height: 80,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      borderTopWidth: 0.5,
      borderColor: '#FFF',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      elevation: 5,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    imageProductChild: {
      width: 100,
      height: 100,
      borderWidth: 0.5,
      borderColor: COLORS.black,
      borderRadius: 2,
    },
    btnSaleNow: {
      width: '35%',
      height: 50,
      backgroundColor: COLORS.red,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomSheetContainer: {
      flex: 1,
      padding: '3%',
    },
    evaluation: {
        marginLeft: '3%',

    },
    star: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    viewItemProducts: {
      width: '43%',
      height: 210,
      backgroundColor: COLORS.white,
      borderWidth: 1,
      borderColor: '#DEDEDE',
      borderRadius: 10,
      marginTop: 15,
      marginLeft: '5%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
  
      elevation: 7,
    },
  });