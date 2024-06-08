import {useEffect, useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  FlatList,
  Alert,
  ToastAndroid,
} from 'react-native';
import {API_ADDRESS} from '../../config/api-consts';
import {User} from '../../hooks/useContext';
import axios, { Axios } from 'axios';
import ModalConfirm from '../../components/morecules/ModalConfirm/ModalConfirm';

const DeliveryScreen = ({navigation , route}) => {

  const {dataProductOrder , fromScreen} = route?.params || {};

  const {userData} =  User();
  console.log(userData._id);
  const [dataDelivery, setdataDelivery] = useState([]);
  const [itemDelete ,setItemDelete] = useState();
  const [itemIndex , setItemIndex] = useState();

  console.log(fromScreen , "fromScreen ")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_ADDRESS}/${userData._id}`);
        const data = Array.isArray(response.data) ? response.data : [response.data];
        setdataDelivery(data);
        console.log(data, "dataDelivery");
      } catch (error) {
        console.log(error);
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      // Khi màn hình được focus, fetch dữ liệu mới
      fetchData();
    });

    // Clean up listener khi component unmounts
    return unsubscribe;
  }, [navigation]); 

  console.log(dataDelivery);

  const handleAddAddressToOrder = ( item , index) =>{
    if(fromScreen === 'OrderDetailsScreen'){
      navigation.navigate('OrderDetailsScreen' , {dataAddress : item , dataProductOrder : dataProductOrder});
    }
  }

  const handleDeteleAddress = () =>{
    console.log(itemDelete._id , '=------>>>>');

    const newArray = [...dataDelivery];
    // Xóa sản phẩm ở vị trí index khỏi mảng
    newArray.splice(itemIndex, 1);
    // Cập nhật lại state productArray với mảng mới đã xóa sản phẩm
    setdataDelivery(newArray);
    axios({
      method: 'delete',
      url: `${API_ADDRESS}/${userData._id}`,
      data: {
        id : itemDelete._id
      }
    }).then(function (response) {
      if(response){
        ToastAndroid.showWithGravity(
          'Xóa thành công',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        setModalVisible(false);
      }
    })
    .catch(function (error) {
      console.log(error);
    });;
  }

  const [isModalVisible, setModalVisible] = useState(false);

 const OnlickDeleteItemAddress = (item , index) =>{
      setItemDelete(item);
      setItemIndex(index);
      setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          backgroundColor: '#FFFFFF',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{width: 22, height: 22}}
            source={require('@/images/back.png')}
          />
        </TouchableOpacity>
        
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 20,
          }}>
          <Text style={{fontSize: 22, color: 'black'}}>
            Chọn địa chỉ giao hàng
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: 10,
          backgroundColor: '#E5E5E5',
          shadowColor: 'black', // Màu sắc của bóng
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25, // Độ đậm của bóng
          shadowRadius: 3, // Bán kính của bóng
          elevation: 5, // Chỉ định độ nổi của view (chỉ áp dụng cho Android)
        }}></View>
      <View style={{backgroundColor: '#FFFFFF', paddingBottom: 10}}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 10,
          }}>
          <TouchableOpacity>
            <Text
              style={{fontSize: 20, color: '#CB2027'}}
              onPress={() => navigation.navigate('AddDeliveryScreen')}>
              Thêm địa chỉ mới
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={dataDelivery}
            renderItem={({item, index}) => {
              return (
                <View style={{marginTop: 10}}>
                  <View
                    style={{
                      width: '100%',
                      height: 1,
                      backgroundColor: '#E5E5E5',
                    }}></View>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      paddingLeft: 10,
                      paddingRight: 10,
                      marginTop: 10,
                    }}>
                    <TouchableOpacity
                        onPress={() => handleAddAddressToOrder(item , index)}
                      style={{flexDirection: 'column', flex: 1}}>
                      <Text style={{fontSize: 15, color: 'black'}}>
                        {item.name}
                      </Text>
                      <Text>{item.phone}</Text>
                      <Text>{item.street}</Text>
                      <Text>{item.city}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => OnlickDeleteItemAddress(item, index)}
                      style={{alignItems: 'center', justifyContent: 'center'}}>
                      <Text style={{color: '#FF0000'}}>Xóa</Text>
                    </TouchableOpacity>
                  </View>
                  
                </View>
              );
            }}
          />
        </View>
        <ModalConfirm
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDeteleAddress}
        content={"Bạn có muốn xóa không"}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
});

export default DeliveryScreen;
