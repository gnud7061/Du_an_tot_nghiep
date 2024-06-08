import React, { Children, useCallback } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../../../constants/colors";

const ButtonCustom = ({onPress , textContent}) =>{
  

    return(
      
         <TouchableOpacity
                onPress={onPress}
                style={[styles.button]}
            >
               <Text style={styles.text}>{textContent}</Text> 
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button :{
        width : '90%',
        height : 54,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 10,
        backgroundColor : COLORS.App
    },
    text:{
        fontSize : 16,
        fontWeight : '600',
        color : COLORS.white
    }
});

export default ButtonCustom;