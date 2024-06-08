import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeModules,
  ToastAndroid,
} from 'react-native';
import COLORS from '../../constants/colors';
import {Icons} from '../../constants/images';
import {User} from '../../hooks/useContext';

import {useState, useCallback, useEffect} from 'react';
import {
  API_DELETE_IN_CART,
  API_ORDER,
  API_COLOR_PRODUCT,
} from '../../config/api-consts';
import {API_PRODUCT_ORDER} from '../../config/api-consts';
import Icon from 'react-native-vector-icons/Fontisto';
import axios, {Axios} from 'axios';
import {Cart} from '../../hooks/cartContext';
import OrderItemView from '../../components/organisms/OrderItemView/OrderItemView';

const OrderDetailsScreen = ({navigation, route}) => {
  // const { idProduct, idPropoties , name , size , quantity , color , price , image } = route.params;

  const {dataProductOrder, dataAddress} = route.params;

  const currentRouteName = route.name;

  console.log(route, navigation, 'ooooooo');

  console.log(currentRouteName, 'lkkkkkk');

  const {removeFromCart} = Cart();

  const {userData} = User();

  let addressOrder = '';
  if (dataAddress) {
    addressOrder =
      'Số điện thoại : ' +
      dataAddress.phone +
      ' ,Tên người nhận : ' +
      dataAddress.name +
      ' ,Đường : ' +
      dataAddress.street +
      ' ' +
      dataAddress.city;
  } else {
    addressOrder =
      'Số điện thoại : ' +
      userData.numberPhone +
      ' ,Tên người nhận : ' +
      userData.username +
      ' ,Đường : ' +
      userData.address;
  }

  console.log(dataProductOrder, ' dataProductOrder =>>>>>>>>>>)))))((((((');

  const deleteProductInCart = dataProductOrder.map(item => item._id);

  const orderItems = dataProductOrder.map(item => ({
    sizeId: item.PropertiesId,
    quantity: item.Quantity,
  }));

  console.log(deleteProductInCart, 'deeeeeeeeeeee');

  var costTranformer = 22000;

  const totalPriceProduct = dataProductOrder.reduce(
    (accumulator, currentItem) =>
      accumulator + parseFloat(currentItem.Price) * currentItem.Quantity,
    0,
  );

  const totalPrice = totalPriceProduct + costTranformer;

  const idUser = userData._id;
  const userName = userData.username;
  const email = userData.email;
  const address = userData.address;
  const numberPhone = userData.numberPhone;

  // console.log(idUser , userName , email , address , numberPhone);

  const [isChecked, setIsChecked] = useState(false); // State để lưu trạng thái của checkbox

  const toggleCheckbox = () => {
    setIsChecked(!isChecked); // Hàm để đảo ngược trạng thái của checkbox
  };

  // const [total, setTotal] = useState(price * quantity + costTranformer);

  const [status, setStatus] = useState('Chờ xác nhận');

  const [methodPay, setMethodPay] = useState();

  // const [addressOrder , setAddressOrder] = useState("");

  const callBackPriceProduct = useCallback(
    quantityFinish => {
      var totalPriceProduct = price * quantityFinish + costTranformer;

      setTotal(totalPriceProduct);
    },
    [quantityFinish],
  );

  const [quantityFinish, setQuantityFinish] = useState(
    dataProductOrder.Quantity,
  ); // Số lượng mặc định là 1

  // Hàm xử lý cộng số lượng
  const incrementQuantity = useCallback(() => {
    setQuantityFinish(quantityFinish + 1);

    callBackPriceProduct(quantityFinish + 1);
  });

  // Hàm xử lý trừ số lượng, không cho giảm dưới 1
  const decrementQuantity = () => {
    if (quantityFinish > 1) {
      setQuantityFinish(quantityFinish - 1);

      callBackPriceProduct(quantityFinish - 1);
    }
  };
  //de trong view

  const year = new Date().getFullYear();

  // console.log('year :' + year);

  let month = new Date().getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }

  // console.log('month :' + month);

  let date = new Date().getDate();

  if (date < 10) {
    date = '0' + date;
  }

  // console.log('date :' + date);

  const hour = new Date().getHours();

  // console.log('hour :' + hour);

  const minutes = new Date().getMinutes();

  const secounds = new Date().getSeconds();
  // console.log('mines :' + minutes);

  const formattedDate = `${year}-${month}-${date} ${hour}:${minutes}:${secounds}`;

  // console.log(formattedDate);

  const handleOrderProduct = async () => {
    await axios
      .post(`${API_COLOR_PRODUCT}`, {orderItems})
      .then(function (response) {
        if (response.data !== null) {
          const data = Array.isArray(response.data)
            ? response.data
            : [response.data];
          console.log(data, 'kkkkkkk');
          if (checkOrder(data) === true) {
            postOrdertoServer();
          } else {
            ToastAndroid.showWithGravity(
              'Sản phẩm đã hết',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  console.log(isChecked);

  const postOrdertoServer = () => {
    if (isChecked) {
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
          PTTT: 'Thanh toán khi nhận hàng',
          address: addressOrder,
        }),
        redirect: 'follow',
      };

      try {
        fetch(API_ORDER, requestOptions)
          .then(response => response.json())
          .then(result => pushProductOnOrder(result));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const checkOrder = data => {
    let count = 0;

    for (let index = 0; index < data.length; index++) {
      for (let i = 0; i < orderItems.length; i++) {
        // Sửa lỗi cú pháp: orderItems.lengtht thành orderItems.length
        if (data[index].PropertiesId === orderItems[i].sizeId) {
          // Sửa lỗi cú pháp: data.index.PropertiesId thành data[index].sizeId và orderItems.i.sizeId thành orderItems[i].PropertiesId
          if (orderItems[i].quantity <= data[index].quantity) {
            // Sửa lỗi cú pháp: orderItems.i.quantity thành orderItems[i].quantity và data.index.quantity thành data[index].quantity
            count++;
          }
        }
      }
      if (count === orderItems.length) {
        return true;
      }
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
          navigation.replace('NotificationOrderSuccess', { dataProductOrder : dataProductOrder , timeOrder : formattedDate});
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

  const handleZaloPay = () => {
    if (isChecked) {
      ToastAndroid.showWithGravity(
        'Vui lòng tắt thanh toán khi nhận hàng',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else {
      navigation.navigate('ZaloPaymentScreen', {
        dataProductOrder: dataProductOrder,
        pricePayment: totalPrice,
        addressReceive: addressOrder,
        deleteProductInCart: deleteProductInCart,
      });
    }
  };

  return (
    <View styles={styles.container}>
      <ScrollView>
        <View style={styles.borderStyles}>
          <View style={styles.address}>
            <Image source={Icons.IconAddress} style={styles.iconAddress} />
            <View style={styles.textAddress}>
              <Text style={styles.textInfo}>
                {dataAddress === undefined ? userName : dataAddress.name}
              </Text>
              <Text style={styles.textInfo}>
                {dataAddress === undefined ? numberPhone : dataAddress.phone}
              </Text>
              <Text style={styles.textInfo2}>
                {dataAddress === undefined
                  ? address
                  : `${dataAddress.street}-${dataAddress.city}`}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DeliveryScreen', {
                  dataProductOrder: dataProductOrder,
                  fromScreen: currentRouteName,
                })
              }>
              <Image source={Icons.IconNext} style={styles.iconNext} />
            </TouchableOpacity>
          </View>
          <View style={styles.viewImageContainer}>
            <Image source={Icons.IconView} style={styles.iconView} />
          </View>
          <View style={styles.item}>
            <OrderItemView
            dataProductOrder={dataProductOrder}
            />
          </View>

          <View style={styles.textTransport}>
            <Text style={styles.transportInfo}>Vận chuyển tiêu chuẩn</Text>
            <Text style={styles.priceTransport}>{costTranformer}</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            padding: '4%',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: COLORS.white,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="shopping-sale" size={32} />
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Inter-Medium',
                marginLeft: '2%',
              }}>
              Voucher của shop
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('VoucherScreen')}>
            <Image source={Icons.IconNext} style={{width: 20, height: 20}} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: COLORS.white,
            marginTop: 3,
            flexDirection: 'column',
          }}>
          <Text
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              marginLeft: 15,
              marginTop: 10,
              fontSize: 16,
            }}>
            Tóm tắt yêu cầu
          </Text>
          <View style={styles.textTransport}>
            <Text
              style={{
                color: COLORS.black,
                fontWeight: 'normal',
                marginLeft: 10,
                marginTop: 7,
              }}>
              Sản phẩm
            </Text>
            <Text style={styles.priceTransport}>{totalPriceProduct}</Text>
          </View>
          <View style={styles.textTransport}>
            <Text
              style={{
                color: COLORS.black,
                fontWeight: 'normal',
                marginLeft: 10,
                marginTop: 7,
              }}>
              Vận chuyển
            </Text>
            <Text style={styles.priceTransport}>{costTranformer}</Text>
          </View>
          <View style={styles.textTransport2}>
            <Text
              style={{
                color: COLORS.black,
                fontWeight: 'bold',
                marginLeft: 10,
                marginTop: 7,
              }}>
              Tổng
            </Text>
            <Text style={styles.priceTransport2}>{totalPrice}</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: COLORS.white,
            flex: 1,
            marginTop: 10,
            flexDirection: 'column',
          }}>
          <Text
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              marginLeft: 15,
              marginTop: 10,
              fontSize: 16,
            }}>
            Phương thức thanh toán
          </Text>
          <View style={styles.textTransport3}>
            <Image
              style={{
                width: 18,
                height: 16,
                marginLeft: 10,
                marginTop: 5,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              source={require('../../assets/images/payment_code.png')}
            />
            <Text
              style={{
                color: COLORS.black,
                fontWeight: 'normal',
                marginTop: 7,
                marginLeft: 20,
              }}>
              Thanh toán khi nhận hàng
            </Text>
            <View style={{paddingRight: '5%'}}>
              {/* Hình ảnh checkbox tùy chỉnh */}
              {isChecked ? (
                <TouchableOpacity onPress={toggleCheckbox}>
                  <Icon name="radio-btn-active" size={24} color={COLORS.red} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={toggleCheckbox}>
                  <Icon name="radio-btn-passive" size={24} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.textTransport3}>
            <Image
              style={{
                width: 34,
                height: 16,
                marginLeft: 10,
                marginTop: 10,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              source={require('../../assets/images/zalopay.png')}
            />
            <Text
              style={{
                color: COLORS.black,
                fontWeight: 'normal',
                marginTop: 10,
                marginLeft: 20,
              }}>
              Zalo Pay
            </Text>
            <TouchableOpacity  onPress={handleZaloPay}>
            <Text style={styles.priceTransport3}>
              Liên kết
            </Text>
            </TouchableOpacity>
            
          </View>
          <View style={styles.textTransport4}>
            <Image
              style={{
                width: 30,
                height: 30,
                marginLeft: 10,
                marginTop: 10,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              source={require('../../assets/images/credit-card.png')}
            />
            <Text
              style={{
                color: COLORS.black,
                fontWeight: 'normal',
                marginTop: 10,
                alignItems: 'center',
              }}>
              Thẻ tín dụng/Ghi nợ
            </Text>
            <View style={{paddingRight: '18%'}} />
          </View>
        </View>
        <View
          style={{
            backgroundColor: COLORS.white,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: '80%',
              height: 40,
              backgroundColor: COLORS.App,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 20,
              borderRadius: 5,
            }}
            onPress={handleOrderProduct}>
            <Text style={{fontFamily: 'Inter-Bold', color: COLORS.white}}>
              Đặt hàng
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.color_EEEEEE,
    justifyContent: 'space-between',
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 20,
    backgroundColor: COLORS.white,
  },
  textAddress: {
    marginLeft: 30,
    flex: 1,
  },
  iconAddress: {
    width: 20,
    height: 20,
  },
  textInfo: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
  },
  textInfo2: {
    color: COLORS.black,
    fontSize: 13,
    marginBottom: 5,
  },
  iconNext: {
    width: 24,
    height: 24,
    marginRight: 20,
  },
  iconVoucher: {
    width: 32,
    height: 32,
  },
  borderStyles: {
    backgroundColor: COLORS.white,
  },
  viewImageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  iconView: {
    width: '100%',
  },

  item: {
    marginBottom: 20, // Add margin bottom to separate items
    padding : '3%'
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

  textTransport: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  textTransport4: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginTop: 10,
  },
  textTransport3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginTop: 10,
  },
  textTransport2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginBottom: 10,
  },
  transportInfo: {
    color: COLORS.black,
  },
  priceTransport: {
    alignSelf: 'flex-end',
    color: COLORS.black,
    marginRight: 20,
    fontWeight: 'bold',
  },
  priceTransport2: {
    alignSelf: 'flex-end',
    color: COLORS.red,
    marginRight: 20,
    fontWeight: 'bold',
  },
  priceTransport3: {
    color: COLORS.black,
    marginLeft: 50,
    fontWeight: 'bold',
    marginTop: 5,
    marginRight: 15,
  },

  regularPrice: {
    fontSize: 16,
    color: '#666',
    textDecorationLine: 'line-through',
  },

  borderCount: {
    flex: 1,
  },
  addressTransport: {
    flexDirection: 'row',
    marginLeft: 25,
    marginTop: 10,
  },
  timeTransport: {
    flexDirection: 'row',
    marginLeft: 25,
  },
  checkbox: {
    alignSelf: 'center',
    width: 10,
    height: 10,
  },
  checkboxContainer: {
    borderRadius: 20, // Border radius cho view bao bọc
    overflow: 'hidden', // Cắt bớt phần ngoài ra khỏi vùng border
  },
  textContainerCenter: {
    justifyContent: 'center',
  },
});

export default OrderDetailsScreen;
