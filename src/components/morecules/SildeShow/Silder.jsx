import {Animated, FlatList, StyleSheet, Text, View   ,Dimensions} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import SlideItem from './SlideItem';
import Pagination from './Pagination';
import COLORS from '../../../constants/colors';


const {width, height} = Dimensions.get("screen");

const Slider = () => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatlistReft = useRef(null);
 const data = [
	{
	  id: 1,
	  img: require('../../../assets/images/SilderShow/sildershow1.png'),

	},
	{
	  id: 2,
	  img: require('../../../assets/images/SilderShow/sildershow2.png'),

	},
	{
	  id: 3,
	  img: require('../../../assets/images/SilderShow/sildershow3.png'),

	},
	{
	  id: 4,
	  img: require('../../../assets/images/SilderShow/sildershow4.png'),

	},
  ];

  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
    // console.log('viewableItems', viewableItems);

    if(viewableItems && viewableItems.length > 0){
      setIndex(viewableItems[0].index || 0);

    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;



  //chạy auto sildeShow
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Move to the next slide
      const newIndex = (index + 1) % data.length;
      setIndex(newIndex);
      // Scroll to the next slide
      scrollX.setValue(newIndex * width);
      flatlistReft.current.scrollToIndex({ animated: true, index: newIndex });

    }, 5000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [index]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatlistReft}
        data={data}
        renderItem={({item}) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        // scrollEnabled={false} // Disable user swipe while auto-scrolling
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={data} scrollX={scrollX} index={index} />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({

  container :{
    width : width,
  },

});