import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import {styleCommon} from '../../theme/styles/CommomStyle';
import {textStyles} from '../../theme/styles/CommomStyle';
import COLORS from '../../constants/colors';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import { API_ADD_USERS } from '../../config/api-consts';
import { User } from '../../hooks/useContext';
import { API_ADDRESS } from '../../config/api-consts';
import axios,{ Axios } from 'axios';
import { IMAGE_URL_DEFAULT } from '../../assets/images/background/imageURL';


const SendOTPRegisterScreen = ({navigation, route}) => {

  const [code, setCode] = React.useState('');

  const {verification, name, email,password , address, numberPhone , street , distric, city} = route.params;

  console.log(numberPhone, 'phoneNumber Register Now =>>>>>>>>')

  const dataUserRegister = {
    username : name,
    email : email,
    passwd : password,
    address : address,
    numberPhone : numberPhone,
    image : IMAGE_URL_DEFAULT,
  }

  const {setUserData} = User();

  console.log(verification + 'KKKKKKKKKKKKKKKKKKKKKKKK>>>>>>>>>>>>>>>>');

  const handleVerifyOTP = () => {
    try {
      const credential = auth.PhoneAuthProvider.credential(verification, code);
       auth().signInWithCredential(credential);
      console.log('đăng ký trên mongodb');
      // Navigate to the main screen upon successful authentication
      setUserData(dataUserRegister);
      console.log('dataUserRegister', dataUserRegister);
      RegisterUserMongodb();
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to verify OTP');
    }
  };

    const RegisterUserMongodb = () => {



        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append(
        'Cookie',
        'connect.sid=s%3AMUhs3zzQOSqhxF85Fo8cxhWe-tIcn7yJ.4tBwGl%2FKSv%2BCGLjLVN%2BVqs9LV2Tl51tkZIAR8Gd%2Fcwg',
        );

        // console.log(numberPhone);

        const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            username: name,
            passwd: password,
            email: email,
            address: address,
            numberPhone : numberPhone,
            image: IMAGE_URL_DEFAULT,
        }),
        redirect: 'follow',
        };

        try {

        fetch(`${API_ADD_USERS}/${numberPhone}/${email}`, requestOptions)
        .then(response => response.json())
        .then(result => addAddress(result.data._id)
          
          // {
          // if(result._id !== null){

          //   console.log(result._id , "id User lấy về");

            
          
          // }else{ 
            
          //   Alert.alert("Đã tồn tại tài khoản")
          
          // }}
          
          )
        } catch (error) {
            console.log(error);
        }

    };

    const handleChangeOtp = React.useCallback((otp) => {
      setCode(otp);
    }, []);

    const addAddress = (id) =>{
      const dataAddress = {
        UserId: id,
        name: name,
        city: city,
        street: street +", "+ distric,
        phone: numberPhone,
      }

      axios.post(API_ADDRESS, dataAddress)
        .then(function (response) {
          console.log(response);
          if (response.data._id !== null) {
            // ToastAndroid.showWithGravity(
            //   'Thêm thành công',
            //   ToastAndroid.SHORT,
            //   ToastAndroid.BOTTOM
            // );
            navigation.navigate('OnboardingScreen');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={'height'} style={{flex: 1}}>
        <ImageBackground
          source={require('@/images/background/backgounrd_OTP.png')}
          style={styles.image}>
          <Text style={[styles.text]}>OTP verification</Text>
          <Text style={[styleCommon.sp1]}>
            We Will send you a one time password on this Mobile Number
          </Text>
          <Text style={[styles.textPhoneNumber, styleCommon.sp1]}></Text>
          <OtpInputs
            handleChange={otp => handleChangeOtp(otp)}
            numberOfInputs={6}
            style={styles.OTP}
            inputContainerStyles={[styles.underLine]}
            clearTextOnFocus
          />
          <Text style={styleCommon.sp1}>00:30</Text>
          <TouchableOpacity style={styles.btn_Otp} onPress={handleVerifyOTP}>
            <Text style={textStyles.white}>Submit</Text>
          </TouchableOpacity>
        </ImageBackground>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    alignItems: 'center',
  },
  OTP: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  underLine: {
    height: 42,
    width: 42,
    borderWidth: 1,
    borderRadius: 21,
    backgroundColor: '#F6F6F6',
    borderColor: COLORS.borderColorOTP,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: '90%',
  },
  textPhoneNumber: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  btn_Otp: {
    width: 259,
    height: 40,
    borderColor: COLORS.borderColorOTP,
    backgroundColor: '#504093',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
});

export default SendOTPRegisterScreen;
