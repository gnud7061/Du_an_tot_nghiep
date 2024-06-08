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
import { API_ADDRESS } from '../../config/api-consts';
import { API_UPDATE_USER } from '../../../../config/api-consts';
import axios from 'axios';

const ChangePhoneScreen = ({ navigation }) => {


    const { userData } = User();
    const { setUserData } = User();
    const [phone, setPhone] = useState(userData.numberPhone);
    const [phoneFormatted, setPhoneFormatted] = useState('');
    const [isUsernameChanged, setIsUsernameChanged] = useState(false);
    const [errorMessages, setErrorMessages] = useState();


    const handlePhoneChange = (newPhone) => {
        let formattedText = newPhone.trim();
        if (formattedText.startsWith('0')) {
            formattedText = '+84' + formattedText.slice(1);
        }
        setPhoneFormatted(formattedText)

        if (newPhone === userData.numberPhone) {
            setIsUsernameChanged(false)
            setPhone(userData.numberPhone)
        } else if (newPhone === '') {
            setIsUsernameChanged(false)
            setPhone('')
        } else {
            setIsUsernameChanged(true)
            setPhone(newPhone);
        }
    };

    const updatePhoneToMongoDB = () => {
        if (phoneFormatted.length === 12) {
            // console.log('Đã lưu phone người dùng:', phoneFormatted);
            // navigation.navigate('EditProfile')
            console.log(phoneFormatted)
            axios({
                method: 'put',
                url: `${API_UPDATE_USER}/${userData._id}`,
                data: {
                    numberPhone: phoneFormatted
                }
            }).then(function (response) {
                // console.log(response.data);
                // if(response.data._id){

                const userdateNew = {
                    "_id": userData._id,
                    "address": userData.address,
                    "email": userData.email,
                    "image": userData.image,
                    "numberPhone": phoneFormatted,
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
        } else {
            setErrorMessages('Hình như số điện thoại đang sai!!!')
        }

    }


    const handleSavePress = () => {
        // Xử lý logic lưu tên người dùng ở đây
        if (phoneFormatted.length === 12) {
            console.log('Đã lưu phone người dùng:', phoneFormatted);
            navigation.navigate('EditProfile')
        } else {
            setErrorMessages('Hình như số điện thoại đang sai!!!')
        }


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
                    <Text style={{ fontSize: 20, color: 'black' }}>Phone</Text>
                </View>
                <TouchableOpacity
                    style={[styles.button, isUsernameChanged ? styles.buttonActive : styles.buttonInactive]}
                    onPress={updatePhoneToMongoDB}
                    disabled={!isUsernameChanged}
                >
                    <Text style={styles.buttonText}>Lưu</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: '100%', height: 1, backgroundColor: '#E5E5E5' }} />
            <View style={{ margin: 20, }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'gray', marginBottom: 5 }}>Phone
                </Text>
                <TextInput style={{ width: '100%', fontSize: 16, paddingBottom: 20, paddingTop: 20 }}
                    borderBottomWidth={1}
                    borderBottomColor="#E5E5E5"
                    value={phone}
                    onChangeText={handlePhoneChange}
                />
                {errorMessages ? (
                    <Text style={{ color: 'red' }}>{errorMessages}</Text>
                ) : null}
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

export default ChangePhoneScreen;