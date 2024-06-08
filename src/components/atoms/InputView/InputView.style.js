import { StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";

export const styles = StyleSheet.create({
    container :{
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
    },
    viewContainer:{
        width : '90%'
    },
    textColor :{
        color : COLORS.red
    }
})