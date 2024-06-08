import {useCallback, useEffect , useMemo, useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import Loading from '../../components/organisms/Loading/Loading';

import NetInfo from "@react-native-community/netinfo";
const FisrtScreen = ({navigation}) => {
  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       navigation.replace('LoginScreen');
  //     }, 2000);

  //     return () => clearTimeout(timer);
  //   }, [navigation]);

  const FisrtScreenDisplay = useMemo(() => {
    const timer = setTimeout(() => {
      navigation.replace('BottomNavigation');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
            console.log(state.isConnected);
            if(state.isConnected === true){
                FisrtScreenDisplay
            }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
 { isConnected === true ? (
        <ImageBackground
      style={styles.background}
      source={require('@/images/image26.png')}>
      <View style={styles.container}>
        <Image style={styles.imageLG} source={require('@/images/logo1.png')} />
        <Text style={styles.text}>Let's Get Started !</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('BottomNavigation')}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
    ) :(
        <Loading/>
    ) }
    </>
   
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  imageLG: {
    width: 400,
    height: 400,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'black',
    paddingHorizontal: 70,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
    marginRight: 20,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 80,
    color: 'white',
  },
});

export default FisrtScreen;
