import {StyleSheet ,Text , ScrollView, Image , View, } from 'react-native';
import COLORS from '../../../constants/colors';

export default function OrderItemView({dataProductOrder}) {
  return (
    <>
      <ScrollView>
        {dataProductOrder.map((item, index) => (
          <View key={index} style={styles.productInfo}>
            <Image source={{uri: item.Image}} style={styles.imgStyle} />
            <View style={styles.textContainer}>
              <Text numberOfLines={2} style={styles.textStyle}>
                {item.Name}
              </Text>
              <View style={styles.productDetailsWrapper}>
                <Text style={styles.productDetails}>{item.Size}</Text>
              </View>
              <View style={styles.rowContainer}>
                <View style={styles.priceContainer}>
                  <Text style={styles.salePrice}>{item.Price}</Text>
                </View>
                <View
                  style={[
                    styles.countProduct,
                    {
                      width: '50%',
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderColor: '#272727',
                    },
                  ]}>
                  <Text
                    style={{
                      flex: 3,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      textAlign: 'center',
                      borderWidth: 0.5,
                      borderColor: '#272727',
                      color: COLORS.black,
                    }}>
                    {item.Quantity}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  productInfo: {
    flexDirection: 'row',
  },
  imgStyle: {
    width: 80,
    height: 80,
    // marginRight: 10,
    // marginLeft: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  textContainer: {
    flexDirection: 'column',
  },

  textStyle: {
    fontSize: 16,
    color: COLORS.black, // Ensure text color is visible
    marginBottom: 5,
    fontWeight: 'bold',
  },
  productDetailsWrapper: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 5,
    alignSelf: 'flex-start', // Căn chỉnh cho phù hợp với vùng chữ
  },
  productDetails: {
    fontSize: 14,
    marginTop: 5,
    color: '#939393',
  },
  rowContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },

  priceContainer: {
    flexDirection: 'column',
  },
  salePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginRight: 10,
  },
  countProduct: {
    backgroundColor: COLORS.white,
    justifyContent: 'flex-end',
    marginLeft: 30,
    height: 22,
    borderRadius: 8,
    flexDirection: 'row',
  },
});
