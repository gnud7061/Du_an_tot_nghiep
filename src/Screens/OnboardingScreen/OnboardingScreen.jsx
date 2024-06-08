import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
export default function OnboardingScreen() {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate('BottomNavigation');
  };

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity {...props}>
        <Text style={styles.doneButton}>Done</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        DoneButtonComponent={doneButton}
        containerStyles={styles.containerStyles}
        pages={[
          {
            backgroundColor: '#a7f3d0',
            image: (
              <View style={styles.lottie}>
                <Lottie
                  source={require('../../assets/animations/boost.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: '#fef3c7',
            image: (
              <View style={styles.lottie}>
                <Image
                  source={ require('../../assets/images/SilderShow/sildershow1.png')}
                  style={{ width: 200, height: 200 }} // Thay thế bằng kích thước thích hợp
                />
                <Lottie
                  source={require('../../assets/animations/work.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: '#a78bfa',
            image: (
              <View style={styles.lottie}>
                <Lottie
                  source={require('../../assets/animations/achieve.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerStyles: {
    paddingHorizontal: 15,
  },
  lottie: {
    width: width * 0.9,
    height: width,
  },
  doneButton: {
    padding: 20,
    // backgroundColor: 'white',
    // borderTopLeftRadius: '100%',
    // borderBottomLeftRadius: '100%',
  },
});
