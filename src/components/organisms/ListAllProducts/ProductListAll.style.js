import { StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";



export const styles = StyleSheet.create({
    container :{
        flex : 1,
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
      heartIcon: { 
        position: 'absolute', 
        top: 5, right: 5,
        // backgroundColor: 'rgba(255, 0, 0, 0.1)', 
        // borderRadius: 30, 
        // padding: 5,
    },
})