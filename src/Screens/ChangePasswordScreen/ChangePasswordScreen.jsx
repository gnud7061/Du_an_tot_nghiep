import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
  ToastAndroid
} from 'react-native';
import InputView from '../../components/atoms/InputView/InputView';
import COLORS from '../../constants/colors';
import IconI from 'react-native-vector-icons/Ionicons';

import {useState} from 'react';
import { User } from '../../hooks/useContext';
import axios from 'axios';
import { API_RESSET_PASSWORD } from '../../config/api-consts';

const {height , width } = Dimensions.get("screen");

export default function ChangePasswordScreen({navigation}) {

  const {userData} = User();

  const [passwordOld, setPasswordOld] = useState('');
  const [passwordNew, setPasswordNew] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [showPasswordOld, setShowPasswordOld] = useState(false);

  const [showPasswordNew, setShowPasswordNew] = useState(false);

  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const toggleShowPasswordOld = () => {
    setShowPasswordOld(!showPasswordOld);
  };

  const toggleShowPasswordNew = () => {
    setShowPasswordNew(!showPasswordNew);
  };

  const toggleShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const handerOnlickChangePassword = () => {

    if(passwordOld !== userData.passwd){
      ToastAndroid.showWithGravity(
        'Mật khẩu cũ không đúng',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
    if(passwordConfirm !== passwordNew){
      ToastAndroid.showWithGravity(
        'Mật khẩu mới không trùng',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }else{

      console.log("tới đây rk");
      axios.put(`${API_RESSET_PASSWORD}/${userData.numberPhone}`, {
        passwd : passwordNew,
      })
      .then(function (response) {
        if(response.data){
          ToastAndroid.showWithGravity(
            'Thay đổi mật khẩu thành công',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
          navigation.goBack();
        }

        console.log(response);
      }) 
      .catch(function (error) {
        console.log(error);
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{ width : 24 , height : 24}} onPress={() => navigation.goBack()}>
          <IconI name="arrow-back" size={24} />
        </TouchableOpacity>

        <Text style={{fontSize: 20, fontWeight: '600'}}>Thay đổi đổi mật</Text>
        <View></View>
      </View>
      <View style={styles.input}>
        <IconI name="lock-closed" size={24} />
        <TextInput
          secureTextEntry={!showPasswordOld}
          style={{flex: 1, paddingLeft: 10, color: COLORS.black}}
          // value={form.password}
          placeholder="Nhập mật khẩu cũ"
          placeholderTextColor="#6b7280"
          onChangeText={Text => setPasswordOld(Text)}
        />
        <TouchableOpacity onPress={toggleShowPasswordOld}>
          <IconI name={showPasswordOld ? 'eye' : 'eye-off'} size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.input}>
        <IconI name="lock-closed" size={24} />
        <TextInput
          secureTextEntry={!showPasswordNew}
          style={{flex: 1, paddingLeft: 10, color: COLORS.black}}
          // value={form.password}
          placeholder="Nhập mật khẩu mới"
          placeholderTextColor="#6b7280"
          onChangeText={Text => setPasswordNew(Text)}
        />
        <TouchableOpacity onPress={toggleShowPasswordNew}>
          <IconI name={showPasswordNew ? 'eye' : 'eye-off'} size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.input}>
        <IconI name="lock-closed" size={24} />
        <TextInput
          secureTextEntry={!showPasswordConfirm}
          style={{flex: 1, paddingLeft: 10, color: COLORS.black}}
          // value={form.password}
          placeholder="Nhập lại mật khẩu mới"
          placeholderTextColor="#6b7280"
          onChangeText={Text => setPasswordConfirm(Text)}
        />
        <TouchableOpacity onPress={toggleShowPasswordConfirm}>
          <IconI name={showPasswordConfirm ? 'eye' : 'eye-off'} size={24} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handerOnlickChangePassword}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Đổi mật khẩu</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flexDirection: 'row',
    marginBottom: 16,
    height: 56,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.black,
    borderColor: '#817C7C',
    borderWidth: 1,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: COLORS.App,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.App,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  header :{
    width : width,
    height : height/15,
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center',
  }
});
