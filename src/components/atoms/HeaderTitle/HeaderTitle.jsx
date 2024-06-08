import React from 'react';
import {StyleSheet, Text} from 'react-native';
import COLORS from '../../../constants/colors';

const HeaderTitle = (props) => {
  return (
    <Text
      style={[
       styles.textStyle
      ]}
      numberOfLines={1}
      ellipsizeMode={'tail'}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
    textStyle :{
        color : COLORS.black,
        fontFamily : 'Lato-Black',
        fontSize : 20
    }
})

export default HeaderTitle;
