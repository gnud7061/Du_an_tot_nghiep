import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import {Icons} from '../../constants/images';
import {FontText} from '../../constants/Constant';
import COLORS from '../../constants/colors';
import auth from '@react-native-firebase/auth';
import {useState, useEffect} from 'react';

const ForgotPassword = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState();

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

  const handerForgotPassword = async () => {


    try {
      const internationalPhoneNumber = await convertToInternationalPhoneNumber(
        phoneNumber,
      );
      console.log(internationalPhoneNumber); // Kết quả: +84123456789

      const confirmationResult = await auth().signInWithPhoneNumber(
        internationalPhoneNumber,
      );
      navigation.navigate(
        'SendOtpScreen',
        (data = {
          verification: confirmationResult.verificationId,
          phoneNumber : phoneNumber,
        }),
      );
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to send OTP');
    }
  };

  function convertToInternationalPhoneNumber(phoneNumber) {
    // Kiểm tra nếu số điện thoại không hợp lệ hoặc rỗng
    if (!phoneNumber || typeof phoneNumber !== 'string') {
      return null;
    }

    // Xóa các ký tự không phải số
    phoneNumber = phoneNumber.replace(/\D/g, '');

    // Nếu số điện thoại không có 10 chữ số (không tính mã quốc gia), trả về null
    if (phoneNumber.length !== 10) {
      return null;
    }

    // Thêm mã quốc gia +84 vào đầu số điện thoại
    return '+84' + phoneNumber.slice(1);
  }

  return (
    <>

    <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView behavior='padding'  >
      <Image style={styles.imageStyle} source={Icons.ImageForogtPassword} />
        <View style={styles.borderText}>
          <Text style={styles.textStyle}>Forgot</Text>
          <Text style={styles.textStyle}>Password?</Text>
        </View>
        <Text style={styles.textStyle2}>
          Don't worry! It happens. Please enter the phone number we will send
          the OTP in this phone number
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter the phone"
          placeholderTextColor={COLORS.color_7E7D7D}
          onChangeText={Text => setPhoneNumber(Text)}
        />

        <View style={styles.formAction}>
          <TouchableOpacity onPress={handerForgotPassword}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Continue</Text>
            </View>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>

    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width : '100%',
    height : '100%',
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  imageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 300,
    height: 300,
  },
  textStyle: {
    fontFamily: FontText.FS_PF_BeauSans_Pro_SemiBold,
    fontSize: 24,
    color: COLORS.black,
  },
  textStyle2: {
    fontSize: 14,
    color: COLORS.textHint,
    marginTop: 15,
    marginBottom: 15,
  },
  textInput: {
    height: 60,
    backgroundColor: COLORS.color_f6f6f6,
    borderRadius: 8,
    elevation: 4,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    padding: 12,
  },
  formAction: {},
  btn: {
    height: 50,
    backgroundColor: COLORS.black,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 30,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  borderText: {
    marginTop: 40,
    flexDirection: 'column',
  },
});

export default ForgotPassword;
