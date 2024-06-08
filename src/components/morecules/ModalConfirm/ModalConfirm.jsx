import React from 'react';
import {Modal, View, Text, Button, TouchableOpacity} from 'react-native';
import COLORS from '../../../constants/colors';

const ModalConfirm = ({visible, onClose, onConfirm , content}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1}}>
        <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10 , marginTop : '70%'}}>
          <Text
          style={{ fontFamily : 'Inter-Bold', fontSize : 18}}
          >{content}
          </Text>
          <View style={{width: '100%', flexDirection: 'row' , marginTop : 20}}>
            <TouchableOpacity
              onPress={onConfirm}
              style={{
                width: '50%',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth : 1,
                borderRadius : 5,
                backgroundColor : COLORS.App
              }}>
              <Text
              style={{
                fontSize : 16 , 
                fontWeight : 'bold',
                color : COLORS.white
              }}
              >OKE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              style={{
                width: '50%',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth : 1,
                borderRadius : 5,
                backgroundColor : COLORS.red
              }}>
              <Text
              style={{
                fontSize : 16,
                fontWeight : 'bold',
                color : COLORS.white
              }}
              >Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalConfirm;
