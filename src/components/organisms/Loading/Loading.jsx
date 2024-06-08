import React, {useEffect, useRef, Animated} from 'react';
import { View , StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';


export default function Loading() {


  return (
    <View
          style={{ flex: 1,
            justifyContent: 'center',
            alignItems: 'center',}}
        >
          <LottieView
            style={{
              height: 50,
              width: 50,
            }}
            source={require('../../../assets/animations/Animation_loading.json')}
            autoPlay
            loop
          />
        </View>
  );
}
