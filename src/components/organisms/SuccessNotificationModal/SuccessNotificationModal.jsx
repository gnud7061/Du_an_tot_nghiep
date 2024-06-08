import {
  Modal,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated
} from 'react-native';
import {create} from 'react-test-renderer';
import {styleCommon} from '../../../theme/styles/CommomStyle';
import COLORS from '../../../constants/colors';
import ButtonPrimary from '../../atoms/Button/Button';
import {useCallback, useState} from 'react';
import Icon from 'react-native-vector-icons/Octicons';

const {height, width} = Dimensions.get('window');

const SuccessNotificationModal = props => {
  const {visible ,textContent} = props;

  console.log(visible);

  const handleOnpressBtnSucsess = () => {};

  return (
    <Modal visible={visible}>
      <View style={styles.containerModal}>
        <View style={{ position : 'relative'}}>
            <Image source={require('../../../assets/images/Ellipse.png')}/>
            <View style={{ position : 'absolute' , top : 15 , right : 15 , left : 15 , bottom : 15}}>
                <Image source={require('../../../assets/images/fi_check.png')}/>
            </View>
        </View>
          <Text style={[styleCommon.h1,{ marginTop : 10 , color : COLORS.black}]}>{textContent}</Text>
        <TouchableOpacity
          style={styles.notifi}
          onPress={handleOnpressBtnSucsess}>
          <Text style={{ color : COLORS.white}}>Thành công</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    padding : 16
  },
  notifi: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop : 45
  },
});

export default SuccessNotificationModal;
