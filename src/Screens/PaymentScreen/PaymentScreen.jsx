import {
  FlatList,
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
import {FontText} from '../../constants/Constant';
import { User } from '../../hooks/useContext';

const PaymentScreen = ({navigation}) => {
  const {dataUser} = User();
  return (
    <ScrollView style={styles.container}>
      <Image source={Icons.ImageCard} style={styles.imgCard} />
      <TouchableOpacity style={styles.iconCamera}>
        <Image source={Icons.IconCamera} />
      </TouchableOpacity>
      <View
        style={{
          paddingTop: 10,
          justifyContent: 'center',
          marginLeft: 20,
          marginRight: 20,
        }}>
        <View style={{marginBottom: 22}}>
          <Text style={styles.nameOfScreen}>Name of card</Text>
          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.color_D2D2D2,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 10,
            }}>
            <TextInput
              placeholder="Varat Singh Sharma"
              placeholderTextColor={COLORS.color_A1A1A1}
              keyboardType="default"
              style={{
                width: '100%',
              }}
            />
          </View>
        </View>

        <View style={{marginBottom: 22}}>
          <Text style={styles.nameOfScreen}>Card Number</Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              height: 48,
              borderColor: COLORS.color_D2D2D2,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 10,
            }}>
            <TextInput
              placeholder="4747 4747 4777"
              placeholderTextColor={COLORS.color_A1A1A1}
              style={{
                width: '100%',
                flex: 1,
              }}
            />
            <Image
              source={Icons.IconCardNumber}
              style={{width: 40, height: 24, marginRight: 10}}
            />
          </View>
        </View>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <View style={{marginBottom: 22, flex: 1, marginRight: 20}}>
            <Text style={styles.nameOfScreen}>Expiry date</Text>
            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: COLORS.color_D2D2D2,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 10,
              }}>
              <TextInput
                placeholder="07/21"
                placeholderTextColor={COLORS.color_A1A1A1}
                keyboardType="phone-pad"
                style={{
                  width: '100%',
                }}
              />
            </View>
          </View>

          <View style={{marginBottom: 22, flex: 1}}>
            <Text style={styles.nameOfScreen}>CVC</Text>
            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: COLORS.color_D2D2D2,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 10,
                flexDirection: 'row',
              }}>
              <TextInput
                placeholder="474"
                placeholderTextColor={COLORS.color_A1A1A1}
                style={{
                  width: '100%',
                  flex: 1,
                }}
              />
              <Image
                source={Icons.IconCVC}
                style={{width: 33, height: 24, marginRight: 10}}
              />
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row', flex: 1}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={{
              width: '100%',
              marginTop: 18,
              marginBottom: 4,
              borderWidth: 1,
              borderRadius: 8,
              height: 50,
              backgroundColor: COLORS.black,
            }}>
            <Text style={styles.submitText}>Use this card</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.color_EEEEEE,
  },
  iconCamera: {
    width: 34,
    height: 29,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  imgCard: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    color: COLORS.white,
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 13,
  },
  nameOfScreen: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 10,
  },
});
export default PaymentScreen;
