import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../../../constants/colors";

const SizeItem = (props) =>{

    const size = props.size;

    return(
        <>
            <TouchableOpacity style={styles.container}>
                <Text>{size}</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    container :{
        width : 40,
        height : 40,
        borderColor : COLORS.gray,
        borderRadius : 5,
        borderWidth : 1.5,
        justifyContent : 'center',
        alignItems : 'center',
        margin : 10
    }
})

export default SizeItem;