import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetBackdropProps
} from '@gorhom/bottom-sheet';
import {Icons} from '../../constants/images';
import COLORS from '../../constants/colors';
import {Fragment, useState , useRef , useCallback , useMemo} from 'react';
import {IMAGE_URL_DEFAULT} from '../../assets/images/background/imageURL';
import {User} from '../../hooks/useContext';
import ModalConfirm from '../../components/morecules/ModalConfirm/ModalConfirm';
import Icon from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/FontAwesome';
import Login from '../../components/organisms/Login/Login';

const Profile = ({navigation}) => {
  const {userData} = User();

  // console.log(userData.image);


  const [showModal, setShowModal] = useState(false);

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ['25%', '100%'], []);


  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);


  const navigateToEditProfile = () => {
    console.log('Edit Profile Action');
    navigation.navigate('EditProfile');
  };
  const navigateToSecurity = () => {
    console.log('Security Action');
    navigation.navigate('YourOrderScreen');
  };

  const navigateToNotifications = () => {
    console.log('Notifications Action');
    navigation.navigate('SettingNotificationScreen');
  };

  const navigateToPrivacy = () => {
    console.log('Privacy Action');
    navigation.navigate('ChangePasswordScreen');
  };
  const accountItem = [
    {
      icon: Icons.IconEditProfile,
      text: 'Thông tin',
      action: navigateToEditProfile,
    },

    {
      icon: Icons.IconListOrder,
      text: 'Đơn hàng của bạn',
      action: navigateToSecurity,
    },

    {
      icon: Icons.IconNotification,
      text: 'Cài đặt thông báo',
      action: navigateToNotifications,
    },

    {
      icon: Icons.IconPrivacy,
      text: 'Thay đổi mật khẩu',
      action: navigateToPrivacy,
    }
  ];

  const renderSettingItem = ({icon, text, action}) => (
    <TouchableOpacity
      onPress={action}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingLeft: 12,
      }}>
      <Image source={icon} style={styles.iconStyle} />
      <Text style={{marginLeft: 36, fontSize: 16, color: COLORS.black}}>
        {text}
      </Text>
    </TouchableOpacity>
  );

  const navigateToSubscription = () => {
    navigation.navigate('DeliveryScreen')
  };

  const navigateToSupport = () => {
    console.log('Help & Support Action');
  };

  const navigateToTermsAndPolicies = () => {
    console.log('Terms and Policies Action');
  };

  const supportItems = [
    {
      icon: Icons.IconSubscription,
      text: 'Thêm địa chỉ giao hàng',
      action: navigateToSubscription,
    },
    {icon: Icons.IconHelp, text: 'Help & Support', action: navigateToSupport},
    {
      icon: Icons.IconInfo,
      text: 'Terms and Policies',
      action: navigateToTermsAndPolicies,
    },
  ];

  const navigateToFreeUpSpace = () => {
    console.log('Free up space Action');
  };

  const navigateToDataSaver = () => {
    console.log('Data Saver Action');
  };

  const logout = () => {
    console.log('Logout Action');
    setShowModal(true);
  };

  const cacheAndCellularItems = [
    {
      icon: Icons.IconFreeUpSpace,
      text: 'Free up space',
      action: navigateToFreeUpSpace,
    },
    {icon: Icons.IconDownload, text: 'Data Saver', action: navigateToDataSaver},
  ];

  const actionsItems = [
    {
      icon: Icons.IconLogOut,
      text: 'Đăng xuất',
      action: logout,
    },
  ];

  const handleLogout = () => {
    navigation.replace('LoginScreen');
  };
  return (
    <BottomSheetModalProvider>
    <SafeAreaView style={styles.container}>
      {userData ? (
        <View style={styles.header}>
          {/* <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{position: 'absolute', left: 0}}
        /> */}

          <ScrollView style={{flex: 1, marginBottom: 12}}>
            <View
              style={{
                marginTop: 20,
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <Image
                source={{
                  uri:
                    userData.image === '' ? IMAGE_URL_DEFAULT : userData.image,
                }}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 400 / 2,
                  borderWidth: 1,
                  borderColor: COLORS.gray,
                }}
              />
            </View>
            {/*Account Setting*/}
            <View style={{marginBottom: 0}}>
              <Text style={{marginVertical: 0, color: COLORS.black}}>
                Tài khoản
              </Text>
              <View style={{borderRadius: 12, color: COLORS.black}}>
                {accountItem.map((item, index) => (
                  <Fragment key={index}>{renderSettingItem(item)}</Fragment>
                ))}
                {supportItems.map((item, index) => (
                  <Fragment key={index}>{renderSettingItem(item)}</Fragment>
                ))}
              </View>
            </View>

            <View style={{marginBottom: 12}}>
              <Text style={{marginVertical: 10, color: COLORS.black}}>
                Actions Settings
              </Text>
              <View style={{borderRadius: 12, color: COLORS.black}}>
                {actionsItems.map((item, index) => (
                  <Fragment key={index}>{renderSettingItem(item)}</Fragment>
                ))}
              </View>
            </View>
          </ScrollView>
          <ModalConfirm
            content={'Bạn muốn đăng xuất không ? '}
            visible={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleLogout}
          />
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Icon name="person-add-outline" size={50} color="gray" />
          <Text style={{margin: 20}}>Đăng nhập vào tài khoản hiện có</Text>
          <TouchableOpacity
            style={{
              width: 200,
              height: 50,
              backgroundColor: COLORS.App,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handlePresentModalPress}
            >
            <Text style={styles.title}>Đăng nhập</Text>
          </TouchableOpacity>
          <Login
          bottomSheetModalRef={bottomSheetModalRef}
          snapPoints={snapPoints}
          handleSheetChanges={handleSheetChanges}
          handleClosePress={handleClosePress}
          navigation={navigation}
          />
        </View>
      )}
    </SafeAreaView>
   
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    // marginHorizontal: 12,
    paddingLeft: 10,
    flexDirection: 'row',
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default Profile;
