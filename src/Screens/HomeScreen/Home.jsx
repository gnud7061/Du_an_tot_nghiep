import React, {useState, useEffect ,useRef , useCallback, useMemo} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  SectionList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import IconI from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios, {isCancel, AxiosError} from 'axios';
import {API_CATEGORY_PRODUCT} from '../../config/api-consts';
import {API_PRODUCT} from '../../config/api-consts';
import {API_PRODUCT_TOP8} from '../../config/api-consts';
import {User} from '../../hooks/useContext';
import {API_ADD_TO_LOVE, API_DELETE_TO_LOVE} from '../../config/api-consts';
import {API_PRODUCT_TO_CART} from '../../config/api-consts';
import COLORS from '../../constants/colors';
import {Cart} from '../../hooks/cartContext';
import Loading from '../../components/organisms/Loading/Loading';
import LoadingHome from '../../components/organisms/LoadingHome/LoadingHome';
import Slider from '../../components/morecules/SildeShow/Silder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useListCategory from '../../services/category-services/use-all-list-category';
import ProductListAll from '../../components/organisms/ListAllProducts/ProductListAll';
import Login from '../../components/organisms/Login/Login';

import {styles} from './Home.style';
const Home = ({navigation}) => {
  const {userData} = User();
  // const userName = dataUser.username;
  const [dataProduct, setDataProduct] = React.useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const [dataCategory] = useListCategory();

  const {setDataCart, dataCart} = Cart();

  console.log(dataCart.length, 'dataCart.length');

  
  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ['25%', '100%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchDataProduct();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const loadLikedProducts = async () => {
      try {
        if (userData !== null) {
          const likedProductsString = await AsyncStorage.getItem(`likedProducts_${userData._id}`);
          if (likedProductsString !== null) {
            setLikedProducts(JSON.parse(likedProductsString));
          }
        }
      } catch (error) {
        console.error('Lỗi khi tải trạng thái yêu thích:', error);
      }
    };

    loadLikedProducts();
  }, [userData?._id]);

  const toggleFavorite = async productId => {
    try {
      if (!productId) {
        console.error('ID của sản phẩm không hợp lệ');
        return;
      }

      const isLiked = isProductLiked(productId);

      let response;
      if (isLiked) {
        response = await axios.delete(
          `${API_DELETE_TO_LOVE}/${userData._id}/${productId}`,
          {
            headers: {
              Cookie:
                'connect.sid=s%3A6OVdwmhVv_cQCbw4O0bbeLxswZhLoCI6.fr%2FkDyMb%2B3Sh7az52%2B%2Fh6rYH0bR79IHMJ9R3yV8%2FKUw',
            },
          },
        );
        console.log(
          'Sản phẩm đã được xóa khỏi danh sách yêu thích:',
          response.data,
        );

        const updatedLikedProducts = likedProducts.filter(
          id => id !== productId,
        );
        setLikedProducts(updatedLikedProducts);
        await AsyncStorage.setItem(
          `likedProducts_${userData._id}`,
          JSON.stringify(updatedLikedProducts),
        );
      } else {
        response = await axios.post(
          `${API_ADD_TO_LOVE}/${userData._id}/${productId}`,
          null,
          {
            headers: {
              Cookie:
                'connect.sid=s%3A6OVdwmhVv_cQCbw4O0bbeLxswZhLoCI6.fr%2FkDyMb%2B3Sh7az52%2B%2Fh6rYH0bR79IHMJ9R3yV8%2FKUw',
            },
          },
        );
        console.log(
          'Sản phẩm đã được thêm vào danh sách yêu thích:',
          response.data,
        );

        const updatedLikedProducts = [...likedProducts, productId];
        setLikedProducts(updatedLikedProducts);
        await AsyncStorage.setItem(
          `likedProducts_${userData._id}`,
          JSON.stringify(updatedLikedProducts),
        );
      }
    } catch (error) {
      console.error('Lỗi khi thực hiện thao tác yêu thích sản phẩm:', error);
    }
  };

  const isProductLiked = productId => {
    return likedProducts.includes(productId);
  };

  const renderHeartColor = productId => {
    return isProductLiked(productId) ? 'red' : 'silver';
  };

  React.useEffect(() => {

    if(userData){
      axios
      .get(`${API_PRODUCT_TO_CART}/${userData._id}`)
      .then(function (response) {
        const data = Array.isArray(response.data)
          ? response.data
          : [response.data];
        // console.log(data);
        setDataCart(data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
   
  }, [userData]);

  const fetchDataProduct = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Cookie',
      'connect.sid=s%3A6OVdwmhVv_cQCbw4O0bbeLxswZhLoCI6.fr%2FkDyMb%2B3Sh7az52%2B%2Fh6rYH0bR79IHMJ9R3yV8%2FKUw',
    );

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(API_PRODUCT_TOP8, requestOptions)
      .then(response => response.json())
      .then(result => setDataProduct(result))
      .catch(error => console.log('error', error));
  };

  React.useEffect(() => {
    fetchDataProduct();
  }, []);

  console.log(dataCart, 'sản phẩm trong giỏ của mỗi người');

  const handleToCartScreen = () =>{
    if (userData) {
      navigation.navigate('CartScreen');
    }else{
      handlePresentModalPress();
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <View>
            <Image
              style={styles.imageTitle}
              source={require('@/images/logoAPP_MD01_png.png')}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SearchProductScreen')}>
              <IconI name="search-outline" size={30} color={'gray'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={handleToCartScreen}>
              <Image source={require('@/icons/png/local_mall.png')} />
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: COLORS.red,
                  position: 'absolute',
                  borderRadius: 10,
                  top: 0,
                  right: 0,
                }}>
                <Text style={{color: COLORS.white, marginLeft: 5}}>
                  {dataCart.length}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Slider />

          <View style={{paddingLeft: 10, marginTop: 10}}>
            <Text style={styles.textHead}>Thể loại</Text>
          </View>
          {dataCategory.length > 0 ? (
            <>
              <View style={{marginTop: 10}}>
                <ScrollView horizontal>
                  {dataCategory.map((item, index) => (
                    <TouchableOpacity
                      key={index} // Đảm bảo có key duy nhất cho mỗi mục
                      onPress={() =>
                        navigation.navigate('ProductCategory', {
                          name: item.name,
                        })
                      }>
                      <View style={styles.viewItem}>
                        <Text>{item.name}</Text>
                        <Image
                          style={{width: 52, height: 52}}
                          source={{uri: item.image}}
                        />
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <View style={{paddingLeft: 10, marginTop: 10}}>
                <Text style={styles.textHead}>Giới thiệu hot</Text>
              </View>
              <ProductListAll
                dataListProduct={dataProduct}
                onpressLove={toggleFavorite}
                heartColor={renderHeartColor}
                navigation={navigation}
              />
            </>
          ) : (
            <Loading />
          )}
        </ScrollView>
        <Login
          bottomSheetModalRef={bottomSheetModalRef}
          snapPoints={snapPoints}
          handleSheetChanges={handleSheetChanges}
          handleClosePress={handleClosePress}
          navigation={navigation}
          />
      </View>
    </View>
  );
};

export default Home;
