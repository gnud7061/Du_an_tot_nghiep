import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HeaderTitle from "../../components/atoms/HeaderTitle/HeaderTitle";
import Icon from "react-native-vector-icons/Ionicons"
import COLORS from "../../constants/colors";
import { API_CATEGORY_PRODUCT } from "../../config/api-consts";
import { API_PRODUCT } from "../../config/api-consts";




const ProductCategory =  ({navigation, route}) => {
  
  const [dataPr,setDataPr] = React.useState([]);
  const {name} = route.params;



    React.useEffect(() =>{

      var myHeaders = new Headers();
      myHeaders.append("Cookie", "connect.sid=s%3A6OVdwmhVv_cQCbw4O0bbeLxswZhLoCI6.fr%2FkDyMb%2B3Sh7az52%2B%2Fh6rYH0bR79IHMJ9R3yV8%2FKUw");

      var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
      };

      fetch(API_PRODUCT, requestOptions)
      .then(response => response.json())
      .then(result => filterDataByName(result))
      .catch(error => console.log('error', error));

  },[]);

  const filterDataByName = (data) => {

    const filtered = data.filter(item => item.category === name);
    setDataPr(filtered);
    // console.log(filtered);
  };

    return(
        <View style ={styles.container}>
            <View style={{ flexDirection : 'row', 
                           alignItems : 'center', 
                           justifyContent : 'space-between',
                           padding : 10}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name='arrow-back' size={32}/>  
                </TouchableOpacity>
                <Text style={styles.textTitle}>{name}</Text>
                <View>

                </View>
            </View>
            <View>
            <FlatList
                data={dataPr}
                numColumns={2}
                contentContainerStyle={{width: '100%'}}
                // keyExtractor={item => item._id}     
                renderItem={({item}) =>{
                    return(
                        <TouchableOpacity style={styles.itemProduct} onPress={() => navigation.navigate('DetailProductScreen',item ={
                            _id : item._id,
                            name : item.name,
                            image : item.image,
                            category : item.category,
                            price : item.price,
                            describe : item.describe,
                            material : item.material,
                            quantitySold : item.quantitySold,
                            instruction : item.instruction,
                            warrantyPolicy : item.warrantyPolicy,
                            })}>
                            <Image source={{ uri : item.image}} style={{ width : '70%' , height : '70%'}}/>
                            <HeaderTitle>{item.name}</HeaderTitle>
                            <Text>{item.price}</Text>
                        </TouchableOpacity>   
                    )
                }}    
            />
            </View>
           
        </View>
    )
}


const styles = StyleSheet.create({
    container :{
        flex : 1, 
        backgroundColor : '#FFFFFF'
    },
    itemProduct:{
        width : "46%",
        height : 220,
        borderRadius : 8,
        borderWidth : 1,
        borderColor : COLORS.borderColor,
        alignItems : 'center',
        justifyContent : 'center',
        marginTop : 20,
        marginLeft : "2.5%"
    },
    textTitle :{
        fontSize : 25,
        fontFamily :"Inter-Bold"
    }
})

export default ProductCategory;