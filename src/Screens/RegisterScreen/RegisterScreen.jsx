import {useState, useEffect, useContext} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import COLORS from '../../constants/colors';
import IconI from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMT from 'react-native-vector-icons/MaterialIcons';

import {Icons} from '../../constants/images';
import {ToggleButton} from 'react-native-paper';
import axios, {Axios} from 'axios';
import auth from '@react-native-firebase/auth';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [street, setStreet] = useState('');
  const [distric , setDistric] = useState('');
  const [city, setCity] = useState('');

  const [errorMessages, setErrorMessages] = useState({
    phoneNumber: '',
    email: '',
    name: '',
    password: '',
    address: '',
  });

  // const [verification,setVerification] = useState(null);

  const [isPasswordShow, setIsPasswordShow] = useState(false);

  function onAuthStateChanged(user) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const validateEmail = email => {
    // Kiểm tra định dạng email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const validatePhoneNumber = text => {
    const regex = /^[0-9]{10}$/; // Regex để kiểm tra định dạng số điện thoại (10 chữ số)
    if (!regex.test(text)) {
      setErrorMessages({phoneNumber: 'Please enter a valid phone number'});
    } else {
      setErrorMessages({phoneNumber: ''});
    }
    setPhoneNumber(text);
  };

  const handerOnlickCreateAccount = async () => {
    console.log('ở đây', 'lll');

    try {
      const errors = {};
      if (phoneNumber === '') {
        errors.phoneNumber = 'Vui lòng nhập số điện thoại';
      } else if (!validateEmail(email)) {
        errors.email = 'Vui lòng nhập đúng định dạng email';
      }
      if (name === '') {
        errors.name = 'Vui lòng nhập tên';
      }
      if (password === '') {
        errors.password = 'Vui lòng nhập password';
      } else if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,}$/.test(
          password,
        )
      ) {
        errors.password =
          'Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất một chữ cái viết hoa, một chữ cái viết thường, một ký tự đặc biệt và một số';
      }
      if (address === '') {
        errors.address = 'Vui lòng nhập địa chỉ';
      }

      setErrorMessages(errors);

      console.log(Object.keys(errors).length, 'OOOOO');

      if (Object.keys(errors).length === 1) {
        // Nếu không có lỗi, bạn có thể tiến hành đăng ký tài khoản ở đây

        console.log('ở đây');

        // chuyển số điện thoại 0 -> +84
        let formattedPhoneNumber = phoneNumber.trim();
        if (formattedPhoneNumber.startsWith('0')) {
          formattedPhoneNumber = '+84' + formattedPhoneNumber.slice(1);

          // chuyển đổi xong thì bắt đầu thực hiện đăng ký

          console.log(formattedPhoneNumber);
          const confirmationResult = await auth().signInWithPhoneNumber(
            formattedPhoneNumber,
          );
          navigation.navigate(
            'SendOTPRegisterScreen',
            (data = {
              verification: confirmationResult.verificationId,
              email: email,
              name: name,
              password: password,
              address: street + distric + city,
              street: street,
              distric : distric,
              city: city,
              numberPhone: formattedPhoneNumber,
            }),
          );
        }
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to send OTP');
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <ScrollView style={{flex: 1, marginHorizontal: 22}}>
      
        <View style={{marginBottom: 40, marginTop: 20, alignItems: 'center'}}>
          <Image source={Icons.IconApp} style={{width: 150, height: 150}} />
        </View>
        <View style={{marginVertical: 0}}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 12,
              color: COLORS.black,
            }}>
            Đăng ký tài khoản
          </Text>
        </View>

        <View style={{paddingTop: 10, justifyContent: 'center'}}>
          <View style={{marginBottom: 22}}>
            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 22,
                flexDirection: 'row',
              }}>
              <Icon name="phone" size={24} />
              <TextInput
                placeholder="Số điện thoại"
                placeholderTextColor={COLORS.black}
                keyboardType="phone-pad"
                style={{
                  width: '100%',
                  paddingLeft: 10,
                  color: COLORS.black,
                }}
                onChangeText={Text => setPhoneNumber(Text)}
              />
            </View>
            {errorMessages.phoneNumber ? (
              <Text style={{color: 'red'}}>{errorMessages.phoneNumber}</Text>
            ) : null}
          </View>
          <View style={{marginBottom: 22}}>
            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 22,
                flexDirection: 'row',
              }}>
              <IconM name="email" size={24} />
              <TextInput
                placeholder="Email"
                placeholderTextColor={COLORS.black}
                keyboardType="email-address"
                style={{
                  width: '100%',
                  paddingLeft: 10,
                  color: COLORS.black,
                }}
                onChangeText={Text => setEmail(Text)}
              />
            </View>
            {errorMessages.email ? (
              <Text style={{color: 'red'}}>{errorMessages.email}</Text>
            ) : null}
          </View>

          <View style={{marginBottom: 22}}>
            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 22,
                flexDirection: 'row',
              }}>
              <Icon name="user" size={24} />
              <TextInput
                placeholder="Tên của bạn"
                placeholderTextColor={COLORS.black}
                style={{
                  width: '100%',
                  paddingLeft: 10,
                  color: COLORS.black,
                }}
                onChangeText={Text => setName(Text)}
              />
            </View>
            {errorMessages.name ? (
              <Text style={{color: 'red'}}>{errorMessages.name}</Text>
            ) : null}
          </View>

          <View style={{marginBottom: 22}}>
            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 22,
                flexDirection: 'row',
              }}>
              <IconI name="lock-closed" size={24} />
              <TextInput
                placeholder="Mật khẩu"
                placeholderTextColor={COLORS.black}
                secureTextEntry={!isPasswordShow}
                style={{
                  width: '100%',
                  paddingLeft: 10,
                  color: COLORS.black,
                }}
                onChangeText={Text => setPassword(Text)}
              />

              <TouchableOpacity
                onPress={() => setIsPasswordShow(!isPasswordShow)}
                style={{
                  position: 'absolute',
                  right: 12,
                }}>
                <Image
                  source={isPasswordShow ? Icons.IconEye : Icons.IconEyeHide}
                />
              </TouchableOpacity>
            </View>
            {errorMessages.password ? (
              <Text style={{color: 'red'}}>{errorMessages.password}</Text>
            ) : null}
          </View>

          <View style={{marginBottom: 22}}>
            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 22,
                flexDirection: 'row',
              }}>
              <IconMT name="streetview" size={24} />
              <TextInput
                placeholder="Đường"
                placeholderTextColor={COLORS.black}
                style={{
                  width: '100%',
                  paddingLeft: 10,
                  color: COLORS.black,
                }}
                onChangeText={Text => setStreet(Text)}
              />
            </View>
          </View>
          <View style={{marginBottom: 22}}>
            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 22,
                flexDirection: 'row',
              }}>
              <IconMT name="streetview" size={24} />
              <TextInput
                placeholder="Quận / Huyện"
                placeholderTextColor={COLORS.black}
                style={{
                  width: '100%',
                  paddingLeft: 10,
                  color: COLORS.black,
                }}
                onChangeText={Text => setDistric(Text)}
              />
            </View>
          </View>
          <View style={{marginBottom: 22}}>
            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 22,
                flexDirection: 'row',
              }}>
              <IconMT name="location-city" size={24} />
              <TextInput
                placeholder="Thành Phố"
                placeholderTextColor={COLORS.black}
                style={{
                  width: '100%',
                  color: COLORS.black,
                }}
                onChangeText={Text => setCity(Text)}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={handerOnlickCreateAccount}
              style={{
                width: '100%',
                marginTop: 18,
                marginBottom: 4,
                borderWidth: 1,
                borderColor : COLORS.App,
                borderRadius: 8,
                height: 50,
                backgroundColor: COLORS.App,
              }}>
              <Text style={styles.submitText}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageTitle: {
    width: 330,
    height: 300,
  },
  submitText: {
    color: COLORS.white,
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 13,
  },
});

export default RegisterScreen;
