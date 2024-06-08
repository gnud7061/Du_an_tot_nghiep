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

const ChangeAddressScreen = ({ navigation }) => {


    const { userData } = User();
    const { setUserData } = User();
    const [address, setaddress] = useState(userData.address);
    const [isUsernameChanged, setIsUsernameChanged] = useState(false);


    const handleaddressChange = (newAddress) => {
        if (newAddress === userData.address) {
            setIsUsernameChanged(false)
            setaddress(userData.address)
        } else if (newAddress === '') {
            setIsUsernameChanged(false)
            setaddress('')
        } else {
            setIsUsernameChanged(true)
            setaddress(newAddress);
        }
    };


    const updateAddressToMongoDB = () => {
        console.log(address)
        axios({
          method: 'put',
          url: `${API_UPDATE_USER}/${userData._id}`,
           data : {
            address : address
          }
        }).then(function (response) {
          // console.log(response.data);
          // if(response.data._id){
    
            const userdateNew = {
              "_id": userData._id, 
              "address": address, 
              "email": userData.email, 
              "image": userData.image, 
              "numberPhone": userData.numberPhone, 
              "passwd": userData.passwd, 
              "username": userData.username
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
        console.log('Đã lưu address người dùng:', address);
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
                    <Text style={{ fontSize: 20, color: 'black' }}>Address</Text>
                </View>
                <TouchableOpacity
                    style={[styles.button, isUsernameChanged ? styles.buttonActive : styles.buttonInactive]}
                    onPress={updateAddressToMongoDB}
                    disabled={!isUsernameChanged}
                >
                    <Text style={styles.buttonText}>Lưu</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: '100%', height: 1, backgroundColor: '#E5E5E5' }} />
            <View style={{ margin: 20, }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'gray', marginBottom: 5 }}>Address
                </Text>
                <TextInput style={{ width: '100%', fontSize: 16, paddingBottom: 20, paddingTop: 20 }}
                    borderBottomWidth={1}
                    borderBottomColor="#E5E5E5"
                    value={address}
                    onChangeText={handleaddressChange}
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

export default ChangeAddressScreen;