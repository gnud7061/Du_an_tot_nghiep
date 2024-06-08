import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {User} from '../../hooks/useContext';
import {API_ORDER} from '../../config/api-consts';
import axios from 'axios';
import {Image} from 'react-native';
import MyTabsOrder from '../../navigation/TopTabNavigation/TopTabNavigation';
import {styles} from './YourOrderScreenStyle'



function YourOrderScreen({navigation}) {
  const {userData} = User();
  const [oderArray, setOderArray] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${API_ORDER}/${userData._id}`);
  //       const data = Array.isArray(response.data)
  //         ? response.data
  //         : [response.data];
  //       setOderArray(data);

  //       // Gọi lại API hoặc thực hiện bất kỳ hành động nào khác ở đây sau khi response được trả về
  //       // Ví dụ: Gọi API khác
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // console.log(oderArray);

  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <TouchableOpacity
          style={{paddingLeft: 20}}
          onPress={() => navigation.goBack()}>
          <Image
            style={{width: 22, height: 22}}
            source={require('@/images/back.png')}
          />
        </TouchableOpacity>
        <View style={styles.viewText}>
          <Text style={styles.textHead}> ĐƠN HÀNG </Text>
        </View>
        <View></View>
      </View>
      <MyTabsOrder/>
    </View>
  );
}



export default YourOrderScreen;
