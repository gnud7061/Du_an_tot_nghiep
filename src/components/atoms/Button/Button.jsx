import React, { Children, useCallback } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../../../constants/colors";

const ButtonPrimary = () =>{
    const {Children , onPress} = props;

    return(
        <>
            <TouchableOpacity
                onPress={onPress}
                style={[styles.button]}
            >
                <Text
                style={styles.text}
                >{Children}</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    button :{
        width : '80%',
        height : 54,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 50,
        backgroundColor : COLORS.black
    },
    text:{
        fontSize : 16,
        fontWeight : '600',
        color : "#FFFFFF"
    }
});

export default ButtonPrimary;


