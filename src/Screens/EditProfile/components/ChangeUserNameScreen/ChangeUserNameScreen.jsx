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
import { User } from '../../../../hooks/useContext';
import { API_UPDATE_USER } from '../../../../config/api-consts';
import axios from 'axios';

const ChangeUserNameScreen = ({ navigation }) => {


  const { userData } = User();
  const { setUserData } = User();
  const [userName, setUserName] = useState(userData.username);
  const [isUsernameChanged, setIsUsernameChanged] = useState(false);

  const handleUsernameChange = (newUsername) => {
    if (newUsername !== userData.username) {
      setIsUsernameChanged(true)
      setUserName(newUsername);
    } else {
      setIsUsernameChanged(false)
      setUserName(userData.username)
    }
  };
  const updateUserNameToMongoDB = () => {
    console.log(userName)
    axios({
      method: 'put',
      url: `${API_UPDATE_USER}/${userData._id}`,
       data : {
        username : userName
      }
    }).then(function (response) {
      // console.log(response.data);
      // if(response.data._id){

        const userdateNew = {
          "_id": userData._id, 
          "address": userData.address, 
          "email": userData.email, 
          "image": userData.image, 
          "numberPhone": userData.numberPhone, 
          "passwd": userData.passwd, 
          "username": userName
        }
        setUserData(userdateNew);
        navigation.navigate('EditProfile')
        console.log(userdateNew)
      // }

      // console.log(userData, 'PPPPPPPP');
    })
    .catch(function (error) {
      console.log(error);
    });;
  }

  const handleSavePress = () => {
    // Xử lý logic lưu tên người dùng ở đây
    console.log('Đã lưu tên người dùng:', userName);
    navigation.navigate('EditProfile')
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
          backgroundColor: '#FFFFFF',
          marginBottom: 10,
          marginTop: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{ width: 22, height: 22 }}
            source={require('@/images/back.png')}
          />
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 20, color: 'black' }}>Tên</Text>
        </View>
        <TouchableOpacity
          style={[styles.button, isUsernameChanged ? styles.buttonActive : styles.buttonInactive]}
          onPress={updateUserNameToMongoDB}
          disabled={!isUsernameChanged}
        >
          <Text style={styles.buttonText}>Lưu</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: '100%', height: 1, backgroundColor: '#E5E5E5' }} />
      <View style={{ margin: 20, }}>
        <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'gray', marginBottom: 5 }}>Tên</Text>
        <TextInput style={{ width: '100%', fontSize: 16, paddingBottom: 20, paddingTop: 20 }}
          borderBottomWidth={1}
          borderBottomColor="#E5E5E5"
          value={userName}
          onChangeText={handleUsernameChange}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  buttonActive: {
    backgroundColor: '#007bff',
  },
  buttonInactive: {
    backgroundColor: 'lightgray',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChangeUserNameScreen;