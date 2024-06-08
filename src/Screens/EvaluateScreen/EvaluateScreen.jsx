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



const EvualuateScreen = ({navigation, route}) => {
  const {userData} = User();
  const {productId} = route.params;
  const [image, setImage] = useState(null);
//   const dataURI = [];
const reference = storage().ref(`evaluate/${userData._id}`);


    const [rating, setRating] = useState(0);
    const [context , setContent] = useState("");
    const handleRating = (star) => {
    setRating(star);

    console.log(star);
    };
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
    if(image){
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
    }else{
      ToastAndroid.showWithGravity(
        'Chưa có hình ảnh đánh giá',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

   
  };

  const updateImageUserToMongoDB = (imageURL) =>{

    if(context == null){
      ToastAndroid.showWithGravity(
        'Chưa có nội dung đánh giá',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );

    }else if(rating === 0){
      ToastAndroid.showWithGravity(
        'Chưa có đánh giá sao',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }else{
      const datetime = useDateCurrent();

      console.log(datetime);
      
  
      axios.post(API_EVALUATE, {
          UserId  : userData._id,
          ProductId : productId,
          username : userData.username,
          imageuser : userData.image,
          datetime : datetime,
          content : context,
          imageContent : imageURL,
          star : rating
        })
        .then(function (response) {
          if(response.data){
            ToastAndroid.showWithGravity(
              'Thêm đánh giá thành công',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          }
        }).then(
          () => navigation.goBack()
        )
        .catch(function (error) {
          console.log(error);
        });
    }
    
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
        Đánh giá
      </Text>
      <View style={{flexDirection: 'row', marginLeft: 20}}>
        {[1,2,3,4,5].map((star , index) =>(
          
            <TouchableOpacity key={index} onPress={() => handleRating(star)}>
                <IconI name="star" size={30} color={ star <= rating ? 'yellow' : 'gray'} />
            </TouchableOpacity>
        ))}
        
      </View>
      <View style={{margin: 20}}>
        <TextInput
          style={styles.input}
          placeholder="Nhập đánh giá của bạn ......"
          multiline={true}
          numberOfLines={4}
          onChangeText={(Text) => setContent(Text)}
          />
      </View>
      <View style={{ width : '100%' , alignItems : 'center'}}>
      <ButtonCustom
        onPress={upLoadImageToFirebaseStorage}
        textContent={"Đánh giá"}        
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

export default EvualuateScreen;
