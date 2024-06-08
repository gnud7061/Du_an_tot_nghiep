import { useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ToastAndroid
} from 'react-native';
import { User } from '../../hooks/useContext';
import { API_ADDRESS } from '../../config/api-consts';
import axios from 'axios';

const AddDeliveryScreen = ({ navigation }) => {
  const { userData } = User();

  const [textName, setTextName] = useState('');
  const [textPhone, setTextPhone] = useState('');
  const [textStreet, setTextStreet] = useState('');
  const [textDistrict, setTextDictrict] = useState('');
  const [textWard, setTextWard] = useState('');
  const [textCity, setTextCity] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (textName && textPhone && textStreet && textCity && textDistrict && textWard) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [textName, textPhone, textStreet, textCity, textDistrict, textWard]);

  const handleInputChange = (text, inputNumber) => {
    switch (inputNumber) {
      case 1:
        setTextName(text);
        break;
      case 2:
        setTextPhone(text);
        break;
      case 3:
        setTextCity(text);
        break;
      case 4:
        setTextDictrict(text);
        break;
      case 5:
        setTextWard(text);
        break;
      case 6:
        setTextStreet(text);
        break;
      default:
        break;
    }
  };

  const checkInputs = () => {
    if (textName && textPhone && textStreet && textCity && textDistrict && textWard) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  };

  const handleComplete = () => {
    if (isComplete) {
      console.log('Inputs are complete');
      const city = textWard+', '+textDistrict+', '+textCity;

      const dataAddress = {
        UserId: userData._id,
        name: textName,
        city: city,
        street: textStreet,
        phone: textPhone,
      }
      // sử lý khi ấn nút thêm mới
      axios.post(API_ADDRESS, dataAddress)
        .then(function (response) {
          console.log(response);
          if (response.data) {
            ToastAndroid.showWithGravity(
              'Thêm thành công',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
            setTextName('');
            setTextCity('');
            setTextPhone('');
            setTextStreet('');

            navigation.navigate('DeliveryScreen');

          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

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
            style={{ width: 22, height: 22 }}
            source={require('@/images/back.png')}
          />
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 20,
          }}>
          <Text style={{ fontSize: 20, color: 'black' }}>Địa Chỉ mới</Text>
        </View>
      </View>
      <Text style={{ margin: 10 }}>Liên Hệ</Text>
      <View>
        <TextInput
          style={{ paddingLeft: 10, height: 70 }}
          placeholder="Họ và Tên"
          placeholderTextColor="#6b7280"
          backgroundColor="white"
          onChangeText={text => {
            handleInputChange(text, 1);
            checkInputs();
          }}
        />
        <View style={{ width: '100%', height: 1, backgroundColor: '#E5E5E5' }} />
        <TextInput
          style={{ paddingLeft: 10, height: 70 }}
          placeholder="Số điện thoại"
          placeholderTextColor="#6b7280"
          backgroundColor="white"
          onChangeText={text => {
            handleInputChange(text, 2);
            checkInputs();
          }}
        />
      </View>
      <Text style={{ margin: 10 }}>Địa Chỉ</Text>
      <View>
        <TextInput
          style={{ paddingLeft: 10, height: 70 }}
          placeholder="Tỉnh/Thành Phố"
          placeholderTextColor="#6b7280"
          backgroundColor="white"
          onChangeText={text => {
            handleInputChange(text, 3);
            checkInputs();
          }}
        />
        <View style={{ width: '100%', height: 1, backgroundColor: '#E5E5E5' }} />
        <TextInput
          style={{ paddingLeft: 10, height: 70 }}
          placeholder="Quận/Huyện"
          placeholderTextColor="#6b7280"
          backgroundColor="white"
          onChangeText={text => {
            handleInputChange(text, 4);
            checkInputs();
          }}
        />
        <View style={{ width: '100%', height: 1, backgroundColor: '#E5E5E5' }} />
        <TextInput
          style={{ paddingLeft: 10, height: 70 }}
          placeholder="Phường/Xã"
          placeholderTextColor="#6b7280"
          backgroundColor="white"
          onChangeText={text => {
            handleInputChange(text, 5);
            checkInputs();
          }}
        />
        <View style={{ width: '100%', height: 1, backgroundColor: '#E5E5E5' }} />
        <TextInput
          style={{ paddingLeft: 10, height: 70 }}
          placeholder="Tên đường"
          placeholderTextColor="#6b7280"
          backgroundColor="white"
          onChangeText={text => {
            handleInputChange(text, 6);
            checkInputs();
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: isComplete ? '#F39402' : '#CDCDCD',
          height: 50,
          padding: 10,
          borderRadius: 5,
          marginVertical: 10,
          marginHorizontal: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={handleComplete}
        disabled={!isComplete}>
        <Text style={{ color: isComplete ? 'white' : 'gray' }}>Thêm mới</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
});
export default AddDeliveryScreen;
