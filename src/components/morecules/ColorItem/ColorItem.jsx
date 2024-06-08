import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback } from "react";


const ColorItem = (props) =>{
    const color = props.color ;

    const handerPress = React.useCallback(()=>{

    },[color])

    return(
        <>
            <TouchableOpacity style={[ styles.container,{ backgroundColor : color}]} onPress={handerPress}>

            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    container :{
        width : 40, 
        height : 40,
        borderRadius : 10,
        margin : 10
    }
})

export default ColorItem;