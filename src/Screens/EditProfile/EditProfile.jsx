import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS from '../../constants/colors';
import {Icons} from '../../constants/images';
import {useEffect, useState} from 'react';
import {User} from '../../hooks/useContext';
import ImagePicker, {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import IconI from 'react-native-vector-icons/Ionicons';
import storage from '@react-native-firebase/storage';
import { API_UPDATE_USER } from '../../config/api-consts';
import axios, { Axios } from 'axios';
import { IMAGE_URL_DEFAULT } from '../../assets/images/background/imageURL';
import ModalConfirm from '../../components/morecules/ModalConfirm/ModalConfirm';

const EditProfile = ({navigation}) => {

  const {userData} = User();

  const dataURI =[];

  const reference = storage().ref(`avatars/${userData._id}`);

  const [imageChange, setImageChange] = useState(null);


  const handleOnpressImagePicker = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        
      });

      if(!result.didCancel){
        const uriUPdate = result.assets[0].uri;
        // console.log(uriUPdate);
        // dataURI.push(uriUPdate);
        setImageChange(uriUPdate);
      }

    } catch (error) {
      console.log(error);
    }

  };

  console.log(dataURI);

  const upLoadImageToFirebaseStorage = async () => {
    // const response = await fetch(dataURI[0]);
    // const blob = await response.blob();
    // console.log(dataURI[0]);

    const task = reference.putFile(imageChange);
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

  const updateImageUserToMongoDB = (url) =>{
    axios({
      method: 'put',
      url: `${API_UPDATE_USER}/${userData._id}`,
       data : {
        image : url
      }
    }).then(function (response) {
      console.log(response);
      console.log("Update image success " , response);
    })
    .catch(function (error) {
      console.log(error);
    });;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <ScrollView style={{flex: 1, marginHorizontal: 22}}>
        <View
          style={{
            marginBottom: 80,
            marginTop: 20,
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <Image
            source={{ uri : imageChange === null ? userData.image : imageChange}}
            style={{
              width: 200,
              height: 200,
              borderRadius: 400 / 2,
              borderWidth: 1,
              borderColor: COLORS.gray,
            }}
          />

          <TouchableOpacity
            onPress={handleOnpressImagePicker}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              marginTop: -30,
              marginLeft: 120,
              backgroundColor: '#42A5F5',
            }}>
            {/* <Image
                source={Icons.IconPlus}
                style={{width: 30, height: 30 }}
              /> */}
            <IconI name="add" size={30} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 18, color: 'gray', fontWeight: '300' }}>Giới thiệu về bạn</Text>
        <View style={{ paddingTop: 10, justifyContent: 'center' }}>
          <TouchableOpacity onPress={()=>navigation.navigate('ChangeUserNameScreen')}>
            <View style={{ marginBottom: 22, flexDirection: 'row' }}>
              <Text style={{ flex: 1 }}>Name</Text>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <Text style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>{userData.username}</Text>
                <Image style={{ width: 15, height: 15 }} source={require('@/images/next.png')} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('ChangeEmailScreen')}>
            <View style={{ marginBottom: 22, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ flex: 1, }}>Email</Text>              
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <Text style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>{userData.email}</Text>
                <Image style={{ width: 15, height: 15 }} source={require('@/images/next.png')} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('ChangePhoneScreen')}>
            <View style={{ marginBottom: 22, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ flex: 1, }}>Phone Number</Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <Text style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>{userData.numberPhone}</Text>
                <Image style={{ width: 15, height: 15 }} source={require('@/images/next.png')} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('ChangeAddressScreen')}>
            <View style={{ marginBottom: 22, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ flex: 1, }}>Address</Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>{userData.address}</Text>
                <Image style={{ width: 15, height: 15 }} source={require('@/images/next.png')} />
              </View>
            </View>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={upLoadImageToFirebaseStorage}
              style={{
                width: '100%',
                marginTop: 18,
                marginBottom: 4,
                borderWidth: 1,
                borderRadius: 8,
                height: 50,
                backgroundColor: COLORS.black,
              }}>
              <Text style={styles.submitText}>Change Information</Text>
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

export default EditProfile;