import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ToastAndroid

} from 'react-native';
import COLORS from '../../constants/colors';
import {useCallback, useEffect, useState} from 'react';
import {Checkbox} from 'react-native-paper';
import {User} from '../../hooks/useContext';
import {API_PRODUCT_TO_CART} from '../../config/api-consts';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/AntDesign';
import {API_PRODUCT , API_COLOR_PRODUCT} from '../../config/api-consts';
import { Cart } from '../../hooks/cartContext';
import Loading from '../../components/organisms/Loading/Loading';
import useListOrderQuantity from '../../services/check-order-quantity-services/use-list-order-quantity';
import axios from "axios";



const CartScreen = ({navigation}) => {
  const {userData} = User();

  const {removeItemFromCart} = Cart();


  const idUser = userData._id;

  const [visible ,setVisible] = useState(false);

  const [productArray, setProductArray] = useState([]);

  const [itemDelete ,setItemDelete] = useState();

  const [indexDelete , setIndexDelete] = useState();

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append(
      'Cookie',
      'connect.sid=s%3A2ZxJ5qiC033izH_apThtJr0MlnV8Uz4z.N3Nf0xYBaBKssx0FkCehJrfHAfR3bNl85nnEvrjfLfA',
    );

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${API_PRODUCT_TO_CART}/${idUser}`, requestOptions)
      .then(response => response.json())
      .then(result => setProductArray(result))
      .catch(error => console.error(error));
  }, []);

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [allChecked, setAllChecked] = useState(false);

  const handleItemPress = index => {
    const newArray = [...productArray];
    newArray[index].isChecked = !newArray[index].isChecked;
    setProductArray(newArray);
    const atLeastOneUnchecked = newArray.some(item => !item.isChecked);
    setAllChecked(!atLeastOneUnchecked);
  };

  // Hàm để cập nhật trạng thái của tất cả các checkbox
  const handleChooseAll = () => {
    const newArray = productArray.map(item => ({...item, isChecked: true}));
    setProductArray(newArray);
    setAllChecked(true);
  };

  const handleUncheckAll = () => {
    const newArray = productArray.map(item => ({...item, isChecked: false}));
    setProductArray(newArray);
    setAllChecked(false);
  };

  const handleDecreaseQuantity = index => {
    const newArray = [...productArray];

    console.log(newArray[index].RemainQuantity ,"++++++++++++");
    if (newArray[index].Quantity > 1 ) {
      newArray[index].Quantity -= 1;
      setProductArray(newArray);
    }
  };

  const handleIncreaseQuantity = index => {

    const newArray = [...productArray];
    console.log(newArray[index].RemainQuantity ,"++++++++++++");

    if (newArray[index].Quantity < 99  &&  newArray[index].Quantity < newArray[index].RemainQuantity) {
      newArray[index].Quantity += 1;
      setProductArray(newArray);
    }else{
      ToastAndroid.showWithGravity(
        ' Sản phẩm này số lượng  trong kho đã hết',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };

  const checkedItemCount = productArray.filter(item => item.isChecked).length;
  const checkedItems = productArray.filter(item => item.isChecked);
  const totalPrice = checkedItems.reduce(
    (accumulator, currentItem) =>
      accumulator + parseFloat(currentItem.Price) * currentItem.Quantity,
    0,
  );

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 3,
  });
  const formatNumber = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' đ';
  };

  console.log('chay toi day r')
  const orderItems = checkedItems.map(item => ({
    sizeId: item.PropertiesId,
    quantity: item.Quantity,
  }));

  console.log(checkedItems, "jjjjjjjj");


  const handleOrderProduct = async () => {


    if(checkedItems.length === 0 ){
      ToastAndroid.showWithGravity(
        'Chưa chọn sản phẩm ',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return;

    }else{
    postData();
    }

  };

  const postData = async () => {

  await  axios.post(`${API_COLOR_PRODUCT}`, { orderItems })
    .then(function (response) {
      if(response.data !== null){
        const data = Array.isArray(response.data)
        ? response.data
        : [response.data];
        console.log(data , "kkkkkkk");
        if(checkOrder(data) === true){
          navigation.navigate('OrderDetailsScreen', {dataProductOrder: checkedItems})
                }
                else{
                  ToastAndroid.showWithGravity(
                    'Sản phẩm đã hết',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                  );
                }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

const checkOrder = (data) =>{

  let count = 0;

  for (let index = 0; index < data.length; index++) {
    for (let i = 0; i < orderItems.length; i++) { // Sửa lỗi cú pháp: orderItems.lengtht thành orderItems.length
        if(data[index].PropertiesId === orderItems[i].sizeId){ // Sửa lỗi cú pháp: data.index.PropertiesId thành data[index].sizeId và orderItems.i.sizeId thành orderItems[i].PropertiesId
            if(orderItems[i].quantity <= data[index].quantity){ // Sửa lỗi cú pháp: orderItems.i.quantity thành orderItems[i].quantity và data.index.quantity thành data[index].quantity
                count++;
            }
        }
    }
    if(count === orderItems.length){
      return true;
    }
}






}




  const renderRightActions = (item, index, progress , dragX) => {
    // Define the content of the swipeable view (e.g., delete button)
    // You can customize this according to your app's needs
    // const trans = dragX.interpolate({
    //   inputRange: [0, 50, 100, 101],
    //   outputRange: [-100, 0, 0, 1],
    // });
    return (
      <Animated.View
        style={{
          backgroundColor: 'red',
          padding: 10,
          marginVertical: 5,
          justifyContent : 'center',
          alignItems : 'center',
          // transform :[{
          //   translateX : trans
          // }]
        }}>
        <TouchableOpacity onPress={() => handleDeleteProductCart(item, index)}>
          <Icon name="delete" size={32} color={COLORS.white} />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // const OpenModalDeleteCart = useCallback((item , index)=>{
  //     setVisible(true);
  //     setItemDelete(item);
  //     setIndexDelete(index);

  // },[indexDelete])

  const handleDeleteProductCart = (item, index) => {
    console.log(item._id , "item._id của cartScreen" );
    console.log(item.CartId , " item.CartId của cartScreen" );
    console.log(item.ProductId , "item.ProductId của cartScreen" );
    // Tạo một bản sao của mảng sản phẩm
    const newArray = [...productArray];
    // Xóa sản phẩm ở vị trí index khỏi mảng
    newArray.splice(index, 1);
    // Cập nhật lại state productArray với mảng mới đã xóa sản phẩm
    setProductArray(newArray);

    removeItemFromCart(item._id);

    const urlencoded = new URLSearchParams();
    const requestOptions = {
      method: 'DELETE',
      body: urlencoded,
      redirect: 'follow',
    };

    fetch(`${API_PRODUCT}/${item._id}`, requestOptions)
      .then(response => response.json())
      .then(
          result => console.log(result)
      )
      .catch(error => console.error(error));

  };


  const renderItem = ({item, index}) => (
    <Swipeable renderRightActions={() => renderRightActions(item , index)}>
      <View style={styles.item}>
        <View style={styles.productInfo}>
          <View style={styles.checkboxStyle}>
            <Checkbox
              status={item.isChecked ? 'checked' : 'unchecked'}
              color={'red'}
              onPress={() => handleItemPress(index)}
            />
          </View>
          <Image source={{uri: item.Image}} style={styles.image} />
          <View style={styles.borderInfo}>
            <View style={styles.imageContainer}>
              <Text numberOfLines={2} style={styles.productName}>
                {item.Name}
              </Text>
              <View style={styles.productDetailsWrapper}>
                {/* <Text style={styles.productDetails}>{item.ColorCode}</Text> */}
                <View style={{ backgroundColor : `#${item.ColorCode}` , height : 25 , width : 25 , borderRadius : 5}}>
                </View>
                <Text style={styles.productDetails}>{item.Size}</Text>

              </View>
              <View style={styles.rowContainer}>
                <View style={styles.priceContainer}>
                  <Text style={styles.salePrice}>{item.priceSale}</Text>
                  <Text style={styles.regularPrice}>{item.Price}</Text>
                </View>
                <View
                  style={[
                    styles.countProduct,
                    {
                      width: '60%',
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderColor: '#272727',
                    },
                  ]}>
                  <TouchableOpacity
                    style={styles.borderCount}
                    onPress={() => handleDecreaseQuantity(index)}>
                    <Text style={{textAlign: 'center', color: COLORS.black}}>
                      -
                    </Text>
                  </TouchableOpacity>
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
                  <TouchableOpacity
                    style={styles.borderCount}
                    onPress={() => handleIncreaseQuantity(index)}>
                    <Text style={{textAlign: 'center', color: COLORS.black}}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Swipeable>
  );

  return (
    <View style={styles.container}>

      {productArray.length >  0 ? (
        <>
        <FlatList
        data={productArray}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
        nestedScrollEnabled={true}
        style={{paddingBottom: 100, marginBottom: 100}}
        />
        </>
      ):(
        <Loading/>
      )}
      <View
        style={[
          styles.bottomSheet,
          {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 100,
            zIndex: 1,
          },
        ]}>
        <View style={styles.rowContainer2}>
          {/* Checkbox */}
          <View style={styles.checkboxContainer}>
            <Checkbox
              color={'red'}
              status={allChecked ? 'checked' : 'unchecked'}
              onPress={allChecked ? handleUncheckAll : handleChooseAll}
            />
            <Text style={styles.checkboxLabel}>
              Choose All ({checkedItemCount})
            </Text>
          </View>
          {/* Title */}
          <Text style={styles.title}>{totalPrice}</Text>
          {/* Order Button */}
          <TouchableOpacity
            style={styles.orderButton}
            onPress={handleOrderProduct}>
            <Text style={styles.orderButtonText}>Order</Text>
          </TouchableOpacity>
        </View>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F2F2F2',
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginVertical: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    flexShrink: 2,
    color: COLORS.black,
    marginLeft: 20,
    marginRight: 10,
  },
  productDetails: {
    fontSize: 14,
    marginTop: 5,
    color: '#939393',
  },
  priceContainer: {
    flexDirection: 'column',
  },
  salePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginRight: 10,
  },
  regularPrice: {
    fontSize: 16,
    color: '#666',
    // textDecorationLine: 'line-through',
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    marginRight: 100,
  },
  image: {
    width: 69, // Set the width and height according to your preference
    height: 69,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  productDetailsContainer: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: COLORS.black,
  },
  productDetailsWrapper: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 5,
    alignSelf: 'flex-start', // Căn chỉnh cho phù hợp với vùng chữ
  },
  checkboxStyle: {
    justifyContent: 'center',
    marginRight: 10,
  },
  borderInfo: {
    flexDirection: 'row',
  },
  countProduct: {
    backgroundColor: COLORS.white,
    justifyContent: 'flex-end',
    marginLeft: 30,
    height: 22,
    borderRadius: 8,
    flexDirection: 'row',
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 0.5,
    marginLeft: 30,
  },
  borderCount: {
    flex: 1,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    justifyContent: 'center', // Thêm dòng này để đẩy bottom sheet xuống dưới
  },
  rowContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 10,
    color: COLORS.black,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderButton: {
    backgroundColor: '#FF2271',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  orderButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default CartScreen;
