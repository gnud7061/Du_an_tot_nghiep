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

const ChangeEmailScreen = ({ navigation }) => {


    const { userData } = User();
    const { setUserData } = User();
    const [email, setEmail] = useState(userData.email);
    const [isUsernameChanged, setIsUsernameChanged] = useState(false);
    const [errorMessages, setErrorMessages] = useState();


    const handleEmailChange = (newemail) => {
        if (newemail === userData.email) {
            setIsUsernameChanged(false)
            setEmail(userData.email)
        } else if (newemail === '') {
            setIsUsernameChanged(false)
            setEmail('')
        } else {
            setIsUsernameChanged(true)
            setEmail(newemail);
        }
    };

    const validateEmail = (email) => {
        // Kiểm tra định dạng email
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSavePress = () => {
        // Xử lý logic lưu tên người dùng ở đây
        if (validateEmail(email)) {
            // console.log('Đã lưu email người dùng:', email);
            // navigation.navigate('EditProfile')
            updateEmailToMongoDB
        } else {
            setErrorMessages('Hãy nhập đúng định dạng email nhé!!!')
        }
    };
    const updateEmailToMongoDB = () => {
        // Xử lý logic lưu tên người dùng ở đây
        if (validateEmail(email)) {
            console.log(email)
            axios({
                method: 'put',
                url: `${API_UPDATE_USER}/${userData._id}`,
                data: {
                    email: email,
                }
            }).then(function (response) {

                const userdateNew = {
                    "_id": userData._id,
                    "address": userData.address,
                    "email": email,
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
        } else {
            setErrorMessages('Hãy nhập đúng định dạng email nhé!!!')
        }

    }

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
                    <Text style={{ fontSize: 20, color: 'black' }}>Email</Text>
                </View>
                <TouchableOpacity
                    style={[styles.button, isUsernameChanged ? styles.buttonActive : styles.buttonInactive]}
                    onPress={updateEmailToMongoDB}
                    disabled={!isUsernameChanged}
                >
                    <Text style={styles.buttonText}>Lưu</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: '100%', height: 1, backgroundColor: '#E5E5E5' }} />
            <View style={{ margin: 20, }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'gray', marginBottom: 5 }}>Email
                </Text>
                <TextInput style={{ width: '100%', fontSize: 16, paddingBottom: 20, paddingTop: 20 }}
                    borderBottomWidth={1}
                    borderBottomColor="#E5E5E5"
                    value={email}
                    onChangeText={handleEmailChange}
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

export default ChangeEmailScreen;