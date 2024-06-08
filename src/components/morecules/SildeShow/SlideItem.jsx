import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Animated,
    Easing,
  } from 'react-native';
  import React from 'react';
  
  const {width, height} = Dimensions.get('screen');
  
  const SlideItem = ({item}) => {
    const translateYImage = new Animated.Value(0);
  
    Animated.timing(translateYImage, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
    
    
  
    return (
      <View style={styles.container}>
        <Animated.Image
          source={item.img}
          style={[
            { borderRadius : 50,
              width : width,
              height : 250,
              transform: [
                {
                  translateY: translateYImage,
                },
              ],
              
            },
          ]}
        />
      </View>
    );
  };
  
  export default SlideItem;
  
  const styles = StyleSheet.create({
    container: {
      width : width,
      height : 250,
    },
  });