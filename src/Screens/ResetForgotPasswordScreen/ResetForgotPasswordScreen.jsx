import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid
} from 'react-native';
import {Icons} from '../../constants/images';
import {FontText} from '../../constants/Constant';
import COLORS from '../../constants/colors';
import auth from '@react-native-firebase/auth';
import {useState} from 'react';
import SuccessNotificationModal from '../../components/organisms/SuccessNotificationModal/SuccessNotificationModal';
import { API_RESSET_PASSWORD } from '../../config/api-consts';

const ResetForgotPasswordScreen = ({navigation ,route}) => {

  const {phoneNumber} = route.params;

  console.log("Your number phone" + phoneNumber);


  const [visible, setVisible] = useState(false);


  const [passwordReset, setPasswordReset] = useState();

  const [passwordConfirm, setPasswordConfirm] = useState();


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

  const handerForgotPasswordReset = async () => {

   const internationalPhoneNumber = await convertToInternationalPhoneNumber(phoneNumber);

    console.log(internationalPhoneNumber);
    if(passwordReset === passwordConfirm){
 
    try {
      const myHeaders = new Headers();
      myHeaders.append(
        'Cookie',
        'connect.sid=s%3AONtAlWU07R3RPkvL4ydlKOwh9p944hba.qBfnHMcC2Yt203yxaDbUEqQ%2B%2FLbl9g5QiPX7d43k8NI',
      );
  
      const urlencoded = new URLSearchParams();
  
      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({ passwd: passwordReset }),
        redirect: 'follow',
      };
  
      fetch(`${API_RESSET_PASSWORD}/${internationalPhoneNumber}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if(result.status ===1){
            ToastAndroid.showWithGravity(
              'Thay Đổi mật khẩu thành công ',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          }
        }).then(() => navigation.navigate('LoginScreen'))
        .catch(error => console.error(error));

    } catch (error) {
      console.log(error)
    }
  } else{
    Alert.alert('Password nhập lại không đúng')
  }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.imageStyle} source={Icons.ImageForogtPassword} />
      <View style={styles.borderText}>
        <Text style={styles.textStyle}>Forgot</Text>
        <Text style={styles.textStyle}>Password?</Text>
      </View>
      <Text style={styles.textStyle2}>
        Don't worry! It happens. Please enter the phone number we will send the
        OTP in this phone number
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Nhập mật khẩu mới"
        placeholderTextColor={COLORS.color_7E7D7D}
        onChangeText={Text => setPasswordReset(Text)}
      />
      <TextInput
        style={styles.textInput}
        placeholderTextColor={COLORS.color_7E7D7D}

        placeholder="Xác nhận mật khẩu"
        onChangeText={Text => setPasswordConfirm(Text)}
      />
      <View style={styles.formAction}>
        <TouchableOpacity onPress={handerForgotPasswordReset}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Thay đổi mật khẩu</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* <SuccessNotificationModal 
        visible={visible}
        textContent={"Thay đổi thành công"}
        
        >
      </SuccessNotificationModal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  imageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 100,
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
    marginTop : 10
  },
  formAction: {},
  btn: {
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

export default ResetForgotPasswordScreen;
