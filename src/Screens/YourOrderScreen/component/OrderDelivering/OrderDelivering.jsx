import { useCallback, useEffect } from 'react';
import {View, StyleSheet, Text , FlatList , TouchableOpacity ,Image} from 'react-native';
import useOrderList from '../../../../services/order-services/use-all-list-order';
import {styles} from './OrderDelivering.style'

const OrderDelivering = ({navigation}) => {


    const listOrderDelivered = useOrderList().filter(item => item.status === "Đang giao");
    

    console.log(listOrderDelivered, "order Deliverd =>>>>>>>>>>.")

    const handleNavigationDetails = (OrderId, status , address) => {
        console.log(OrderId, '---------');
        navigation.navigate('YourOrderDetailScreen', {
          OrderId: OrderId,
          status: status,
          address : address
        });
      };

    const renderItem = ({item, index}) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleNavigationDetails(item._id, item.status , item.address)}>
          <View style={styles.ViewImg}>
            <View>
            <Image  style={styles.ImgItem} source={require('@/images/logoAPP_MD01_png.png')}/>
            </View>
    
            <View style={styles.Orders}>
              <Text style={styles.textNamePr}>{item._id}</Text>
    
              <View style={styles.viewColorSize}>
                <Text style={styles.textColor}>Màu {item.ColorCode},</Text>
              </View>
              <Text style={styles.textSize}>{item.date}</Text>
              {/* <Text style={styles.textPriceNew}>
                {item.Price} <Text style={styles.d}> đ</Text>{' '}
              </Text> */}
              {/* <Text style={styles.textPriceOld}>799.000 đ</Text> */}
    
              <View style={styles.viewStatus}>
                <Text style={styles.textNone}>Trạng thái :</Text>
                <Text style={styles.textStatus}>{item.status}</Text>
              </View>
            </View>
          </View>

        </TouchableOpacity>
      );

  return (
    <View style={styles.container}>
      <FlatList
        data={listOrderDelivered}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        nestedScrollEnabled={true}
        style={{paddingBottom: 100}}
      />
    </View>
  );
};



export default OrderDelivering;
