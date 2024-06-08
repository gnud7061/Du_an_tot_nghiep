import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  NativeModules,
  NativeEventEmitter,
  Linking,
} from 'react-native';
import {Icons} from '../../constants/images';
import COLORS from '../../constants/colors';
import CryptoJS from 'crypto-js';
import {User} from '../../hooks/useContext';
import {API_ORDER} from '../../config/api-consts';
import {API_PRODUCT_ORDER, API_DELETE_IN_CART} from '../../config/api-consts';
import axios, {Axios} from 'axios';
import {Cart} from '../../hooks/cartContext';
import {useCallback, useEffect, useState} from 'react';

const ZaloPaymentScreen = ({navigation, route}) => {
  const {userData} = User();
  const {removeFromCart} = Cart();

  const {dataProductOrder, pricePayment, addressReceive, deleteProductInCart} =
    route.params;
  const [status, setStatus] = useState('chờ xác nhận');
  
  const idUser = userData._id;
  const userName = userData.username;
  const year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  let date = new Date().getDate();
  if (date < 10) {
    date = '0' + date;
  }
  const hour = new Date().getHours();
  const minutes = new Date().getMinutes();
  const secounds = new Date().getSeconds();
  const formattedDate = `${year}-${month}-${date} ${hour}:${minutes}:${secounds}`;
  const {PayZaloBridge} = NativeModules;
  const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);

  const [quantityFinish, setQuantityFinish] = useState(
    dataProductOrder.Quantity,
  ); // Số lượng mặc định là 1

  const prefix = Linking.openURL('/');
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        NotificationOrderSuccess: 'notification-order-success', // Tên màn hình cần chuyển hướng đến
      },
    },
  };

  const handlePaymentZalo = () => {
    createZaloPayOrder();
    return;
  };

  useEffect(() => {
    let subscription = payZaloBridgeEmitter.addListener(
      'EventPayZalo',
      data => {
        console.log('dataEventPayZalo', data);
        navigation.replace('NotificationOrderSuccess');
        handleOrderProduct();
      },
    );
    return () => subscription.remove();
  }, []);

  const getCurrentDateYYMMDD = () => {
    var todayDate = new Date().toISOString().slice(2, 10);
    return todayDate.split('-').join('');
  };

  const createZaloPayOrder = async () => {
    let apptransid = getCurrentDateYYMMDD() + '_' + new Date().getTime();
    let appid = 2553;
    let amount = parseInt(pricePayment);
    let appuser = 'Android_Demo';
    let apptime = new Date().getTime();
    let embeddata = '{}';
    let item = '[]';
    let description = 'Thanh toán đơn hàng quần áo';
    let hmacInput =
      appid +
      '|' +
      apptransid +
      '|' +
      appuser +
      '|' +
      amount +
      '|' +
      apptime +
      '|' +
      embeddata +
      '|' +
      item;
    let mac = CryptoJS.HmacSHA256(
      hmacInput,
      'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
    );
    console.log('====================================');
    console.log('hmacInput: ' + hmacInput);
    console.log('mac: ' + mac);
    console.log('====================================');
    var order = {
      app_id: appid,
      app_user: appuser,
      app_time: apptime,
      amount: amount,
      app_trans_id: apptransid,
      embed_data: embeddata,
      item: item,
      description: description,
      mac: mac,
      bank_code: 'zalopayapp',
    };

    console.log(order);

    let formBody = [];
    for (let i in order) {
      var encodedKey = encodeURIComponent(i);
      var encodedValue = encodeURIComponent(order[i]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    await fetch('https://sb-openapi.zalopay.vn/v2/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    })
      .then(response => response.json())
      .then(resJson => {
        console.log('createZaloPayOrder ', resJson);
        if (resJson.return_code === 1) {
          var payZP = NativeModules.PayZaloBridge;
          payZP.payOrder(resJson.zp_trans_token);
          handleOrderProduct();
        }
      })
      .catch(error => {
        console.log('error ', error);
      });
  };


  const handleOrderProduct = () => {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append(
        'Cookie',
        'connect.sid=s%3AMUhs3zzQOSqhxF85Fo8cxhWe-tIcn7yJ.4tBwGl%2FKSv%2BCGLjLVN%2BVqs9LV2Tl51tkZIAR8Gd%2Fcwg',
      );

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
          UserId: idUser,
          username: userName,
          status: status,
          date: formattedDate,
          PTTT: 'Thanh toán bằng zalopay',
          address: addressReceive,
        }),
        redirect: 'follow',
      };

      try {
        fetch(API_ORDER, requestOptions)
          .then(response => response.json())
          .then(result => pushProductOnOrder(result));
      } catch (error) {
        console.error('Error placing order:', error);
      }
    
  };

  const pushProductOnOrder = data => {
    // console.log(data);

    // console.log(numberPhone);

    const idOrder = data._id;

    // console.log(idOrder, 'IdOrder =>>>>>>>>>>>>');

    const dataArrayOrder = dataProductOrder;

    dataArrayOrder.forEach(item => {
      item.OrderId = idOrder;
    });

    const deleteQuantityProduct = dataArrayOrder.map(item => ({
      sizeId: item.PropertiesId,
      quantity: item.Quantity,
    }));

    // console.log(deleteQuantityProduct , 'JJJJJJJJJ');

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Cookie',
      'connect.sid=s%3AMUhs3zzQOSqhxF85Fo8cxhWe-tIcn7yJ.4tBwGl%2FKSv%2BCGLjLVN%2BVqs9LV2Tl51tkZIAR8Gd%2Fcwg',
    );

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({danhSachSanPham: dataArrayOrder}),
      redirect: 'follow',
    };

    try {
      fetch(API_PRODUCT_ORDER, requestOptions)
        .then(response => response.json())
        .then(result => {
          // if (result.status === 1) {
          removeFromCart(deleteProductInCart);
          deleteProductCart();
          downQuantityServer(deleteQuantityProduct);
          navigation.replace('NotificationOrderSuccess' ,{dataProductOrder : dataProductOrder , timeOrder : formattedDate } );
          // }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProductCart = () => {
    axios
      .delete(`${API_DELETE_IN_CART}`, {
        data: {productIds: deleteProductInCart}, // Truyền mảng productIds vào body của request
      })
      .then(response => {
        // console.log(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  const downQuantityServer = deleteQuantityProduct => {
    axios
      .post(`${API_DELETE_IN_CART}`, {
        orderItems: deleteQuantityProduct, // Truyền mảng productIds vào body của request
      })
      .then(response => {
        console.log(response.data, 'llllllll');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageLogo}>
        <Image source={Icons.IconZaloPay} style={{width: 100, height: 100}} />
      </View>

      <View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            fontStyle: 'italic',
          }}>
          {addressReceive}
        </Text>
      </View>
      <ScrollView>
        {dataProductOrder.map((item, index) => (
          <View key={index} style={styles.productInfo}>
            <Image source={{uri: item.Image}} style={styles.imgStyle} />
            <View style={styles.textContainer}>
              <Text numberOfLines={2} style={styles.textStyle}>
                {item.Name}
              </Text>
              <View style={styles.productDetailsWrapper}>
                <Text style={styles.productDetails}>{item.Size}</Text>
              </View>
              <View style={styles.rowContainer}>
                <View style={styles.priceContainer}>
                  <Text style={styles.salePrice}>{item.Price}</Text>
                </View>
                <View
                  style={[
                    styles.countProduct,
                    {
                      width: '50%',
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderColor: '#272727',
                    },
                  ]}>
                  <Text
                    style={{
                      flex: 3,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      textAlign: 'center',
                      borderWidth: 0.5,
                      borderColor: '#272727',
                      color: COLORS.black,
                    }}>
                    {item.Quantity}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View>
        <Text style={styles.pricetotal}>
          Tổng tiền thanh toán : {pricePayment}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: '100%',
          height: 40,
          backgroundColor: COLORS.App,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          marginTop: 20,
        }}
        onPress={handlePaymentZalo}>
        <Text style={{fontFamily: 'Inter-Bold', color: COLORS.white}}>
          Thanh Toán
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
  },
  imageLogo: {
    width: '100%',
    justifyContent: 'center',
    height: 200,
    alignItems: 'center',
  },
  textAddress: {
    marginLeft: 30,
    flex: 1,
  },
  iconAddress: {
    width: 20,
    height: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  item: {
    marginBottom: 20, // Add margin bottom to separate items
  },
  productInfo: {
    flexDirection: 'row',
    margin: '2%',
  },
  borderInfo: {
    flexDirection: 'column',
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDetailsContainer: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: COLORS.black,
  },
  productDetailsWrapper: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 5,
    alignSelf: 'flex-start', // Căn chỉnh cho phù hợp với vùng chữ
  },
  priceContainer: {
    flexDirection: 'column',
  },
  imgStyle: {
    width: 80,
    height: 80,
    marginRight: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textContainer: {
    flexDirection: 'column',
  },
  textStyle: {
    fontSize: 16,
    color: COLORS.black, // Ensure text color is visible
    marginBottom: 5,
    fontWeight: 'bold',
  },
  productDetails: {
    fontSize: 14,
    marginTop: 5,
    color: '#939393',
  },
  salePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginRight: 10,
  },
  countProduct: {
    backgroundColor: COLORS.white,
    justifyContent: 'flex-end',
    marginLeft: 30,
    height: 22,
    borderRadius: 8,
    flexDirection: 'row',
  },
  pricetotal: {
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
});

export default ZaloPaymentScreen;
