import {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ToastAndroid
} from 'react-native';
import {User} from '../../hooks/useContext';
import COLORS from '../../constants/colors';
import {TextInput} from 'react-native-gesture-handler';
import IconI from 'react-native-vector-icons/AntDesign';
import ImagePicker, {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import ButtonCustom from '../../components/atoms/ButtonCustom/ButtonCustom';
import axios,{Axios} from 'axios';
import { API_EVALUATE } from '../../config/api-consts';
import useDateCurrent from '../../services/date-services/use-get-date-current';
import storage from '@react-native-firebase/storage';
import { API_ORDER } from '../../config/api-consts';



const ReasonScreen = ({navigation, route}) => {
  const {userData} = User();
  const {OrderId} = route.params;
  const [image, setImage] = useState(null);
//   const dataURI = [];
const reference = storage().ref(`evaluate/${userData._id}`);
    const [context , setContent] = useState("");

  const handleOnpressImagePicker = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });

      if (!result.didCancel) {
        const uriUPdate = result.assets[0].uri;
        // console.log(uriUPdate);
        setImage(uriUPdate);
        // dataURI.push(uriUPdate);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const upLoadImageToFirebaseStorage = async () => {
    // const response = await fetch(dataURI[0]);
    // const blob = await response.blob();
    // console.log(dataURI[0]);

    const task = reference.putFile(image);
    // Đợi quá trình upload hoàn thành
    task
      .then(async () => {
        console.log('Image uploaded to the bucket!');

        // Lấy URL của ảnh sau khi đã tải lên Firebase Storage
        const url = await reference.getDownloadURL();
        console.log('Download URL:', url);

        updateImageUserToMongoDB(url);
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  };

  const updateImageUserToMongoDB = (imageURL) =>{
    const datetime = useDateCurrent();

    console.log(datetime);
    
    axios
    .put(`${API_ORDER}/${OrderId}`, { status: "Trả hàng" ,reason :context,itemPhoto:imageURL})
    .then(function (response) {
      console.log(response.data); 
      ToastAndroid.showWithGravity
        'Yêu Cầu Trả Hàng Thành Công',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM// response.data thường chứa dữ liệu trả về từ server
    }).then(
        () => navigation.goBack()
      )
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{width: '100%', alignItems: 'center'}}
        onPress={handleOnpressImagePicker}>
        {image ? (
          <Image source={{ uri : image}} style={{width: "80%", height: 250  , borderRadius : 10}} />
        ) : (
          <View
            style={{
              width: '80%',
              height: 250,
              borderRadius: 10,
              backgroundColor: COLORS.borderColor,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>Chọn ảnh</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 20,
          color: COLORS.gray,
          margin: 20,
        }}>
        Lí Do Trả Hàng 
      </Text>
     
      <View style={{margin: 20}}>
        <TextInput
          style={styles.input}
          placeholder="Nhập lí do của bạn ......"
          multiline={true}
          numberOfLines={4}
          onChangeText={(Text) => setContent(Text)}
          />
      </View>
      <View style={{ width : '100%' , alignItems : 'center'}}>
      <ButtonCustom
        onPress={upLoadImageToFirebaseStorage}
        textContent={"Yêu Cầu Trả Hàng "}        
      />
      </View>
      
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
});

export default ReasonScreen;