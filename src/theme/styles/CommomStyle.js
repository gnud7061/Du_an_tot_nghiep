import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

 export const styleCommon = StyleSheet.create({
    textTitle :{
        fontSize : 16,
        fontFamily : "Inter-Bold"
    },
    buttonPrimary :{
        width : 350,
        height : 55,
        backgroundColor : '#000000'
    },
    h1 :{
        fontSize : 30,
        fontWeight : "bold",
    },
    h2:{
        fontSize : 20,
        fontWeight : "600",
    },
    h3 :{
        fontSize : 18,
        fontWeight : '500'
    },
    h4 :{
        fontSize : 16,
        fontWeight : '400'
    },


    // styles speace 

    sp1:{
        marginTop : 10
    },
    sp:{
        marginTop : 20
    }

    
});

export const textStyles = StyleSheet.create({
    white :{
        color : COLORS.white
    },
    textTitle :{
        fontSize : 15,
        margin : 5,
        fontWeight : 'bold'
    }
    
})

export const textTitleContent = StyleSheet.create({
    textTitle :{
        fontSize : 15,
        margin : 5,
        fontWeight : 'bold'
    }
})



