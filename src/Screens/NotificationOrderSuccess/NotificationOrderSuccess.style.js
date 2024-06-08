import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

export const styles = StyleSheet.create({
    container :{
        flex : 1,
        paddingLeft : '3%',
        paddingRight : '3%'
    },
    btn_continueOrder:{
        
        width : '80%',
        height : 50,
        backgroundColor : COLORS.App,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 20,
    },
    btn_home:{
        borderColor : COLORS.App,
        width : '80%',
        height : 50,
        borderWidth : 2,
        borderRadius : 20,
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 20,
        marginBottom : 50
    },
    textBtn:{
        fontSize : 16,
        fontWeight : '600',
        color : COLORS.white
    },
    textHome :{
        color : COLORS.App,
        fontSize : 16,
        fontWeight : '700'
    },
    viewHeader:{
        flexDirection : 'row',
        alignItems : 'center'
    },
    timeOrder :{
        flexDirection : 'row',
        alignItems : 'center'
    }
})