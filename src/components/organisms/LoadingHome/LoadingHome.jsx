import React, {useEffect, useRef, Animated} from 'react';
import { View , StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';


export default function LoadingHome() {


  return (
    <View
          style={{ flex: 1,
            justifyContent: 'center',
            alignItems: 'center',}}
        >
          <LottieView
            style={{
              height: 60,
              width: 60,
            }}
            source={require('../../../assets/animations/LoadingHome.json')}
            autoPlay
            loop
          />
        </View>
  );
}
