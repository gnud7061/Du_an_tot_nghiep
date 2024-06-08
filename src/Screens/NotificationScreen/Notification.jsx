import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS from '../../constants/colors';
import axios from 'axios';
import {User} from '../../hooks/useContext';
import {API_NOTIFICATION, API_PRODUCT} from '../../config/api-consts';
import {firebase} from '@react-native-firebase/database';
import Login from '../../components/organisms/Login/Login';

const Notification = ({navigation}) => {
  const [notificationData, setNotificationData] = useState([])
  const {userData} = User();
  const refConversation = firebase
    .app()
    .database(
      'https://vidu2-96b2f-default-rtdb.asia-southeast1.firebasedatabase.app/',
    )
    .ref('/thongbao');
  const [sp, setSp] = useState([]);

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ['25%', '100%'], []);

  const handlePresentModalPress =  useCallback( () =>  {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  useEffect(() => {
    if (!userData) {
      const unsubscribe = navigation.addListener('focus',  () => {
        handlePresentModalPress();
      });

      return unsubscribe;
    }
    // Lọc dữ liệu với điều kiện UserId là "1" hoặc userData._id
    const query1 = refConversation
      .orderByChild('UserId')
      .equalTo('1')
      .on('child_added', snapshot => {
        const newMessage = snapshot.val();
        // Kiểm tra điều kiện UserId trước khi thêm vào state
        if (newMessage.UserId === '1' || newMessage.UserId === userData._id) {
          setNotificationData(prevMessages => [...prevMessages, newMessage]);
        }
      });

    const query2 = refConversation
      .orderByChild('UserId')
      .equalTo(userData._id)
      .on('child_added', snapshot => {
        const newMessage = snapshot.val();
        // Kiểm tra điều kiện UserId trước khi thêm vào state
        setNotificationData(prevMessages => [...prevMessages, newMessage]);
      });

    // Hủy đăng ký sự kiện khi component bị unmount
    return () => {
      query1.off('child_added');
      query2.off('child_added');
    };
  }, [userData , navigation]);
  console.log(notificationData, 'iiiiiiiiooooooo');

  const DetailTB = async (content, name, item) => {
    if (content === 'Trạng Thái Đơn Hàng') {
      console.log('TT');
    } else if (content === 'Sản Phẩm Mới') {
      console.log('SPM');

      try {
        const response = await axios.get(
          `https://server-datn-md01-team1.onrender.com/api-sanpham/name/${name}`,
          {
            headers: {
              Cookie:
                'connect.sid=s%3A6OVdwmhVv_cQCbw4O0bbeLxswZhLoCI6.fr%2FkDyMb%2B3Sh7az52%2B%2Fh6rYH0bR79IHMJ9R3yV8%2FKUw',
            },
          },
        );
        goToDetailsProductScreen(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm yêu thích:', error);
      }
    }
  };

  const goToDetailsProductScreen = item => {
    navigation.navigate('DetailProductScreen', {
      _id: item._id,
      name: item.name,
      image: item.image,
      category: item.category,
      describe: item.describe,
      price: item.price,
      material: item.material,
      quantitySold: item.quantitySold,
      instruction: item.instruction,
      warrantyPolicy: item.warrantyPolicy,
    });
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        DetailTB(item.content, item.name, item);
      }}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.image}} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.status}</Text>
        <Text style={styles.time}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  // console.log("User data:", userData); // Kiểm tra giá trị của userData

  return (
    <SafeAreaView style={styles.container}>
      {userData ? (
        <FlatList
          data={notificationData}
          renderItem={renderItem}
          keyExtractor={(item, index) => {
            if (item.id) {
              return item.id.toString();
            } else {
              return index.toString();
            }
          }}
        />
      ) : (
        <Login
          bottomSheetModalRef={bottomSheetModalRef}
          snapPoints={snapPoints}
          handleSheetChanges={handleSheetChanges}
          handleClosePress={handleClosePress}
          navigation={navigation}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.color_EEEEEE,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 14,
  },
  imageContainer: {
    width: '20%',
  },
  textContainer: {
    flex: 1, // Sử dụng flex để textContainer chiếm phần còn lại của hàng
    marginLeft: 12, // Khoảng cách giữa ảnh và các nội dung văn bản
    justifyContent: 'center', // Canh chỉnh nội dung theo chiều dọc
  },
  title: {
    fontSize: 16,
    color: COLORS.black,
  },
  time: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 8,
  },
  image: {
    width: '100%', // Đảm bảo ảnh đầy đủ chiều rộng trong container của nó
    height: 85,
  },
});

export default Notification;
