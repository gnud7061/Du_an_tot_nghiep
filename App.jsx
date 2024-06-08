import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
// import type {PropsWithChildren} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import FisrtScreen from './src/Screens/FisrtScreen/FisrtScreen';
import LoginScreen from './src/Screens/LoginScreen/LoginScreen';
import RegisterScreen from './src/Screens/RegisterScreen/RegisterScreen';
import BottomNavigation from './src/navigation/BottomNavigation/BottomNavigation';
import DetailProductScreen from './src/Screens/DetailProductScreen/DetailProductScreen';
import  OnboardingScreen  from './src/Screens/OnboardingScreen/OnboardingScreen';
import { EditProfile } from './src/Screens';
import {MessageScreen } from './src/Screens';
import {CartScreen} from './src/Screens';
import {ProductCategory} from './src/Screens';
import {SendOTPRegisterScreen} from './src/Screens';
import ForgotPassword from './src/Screens/ForgotPassword/ForgotPassword';
import { UserProvider } from './src/hooks/useContext';

import DetailMessage from './src/Screens/MessageScreen/DetailMessage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from './src/Screens/ProfileScreen/Profile';
import SendOtpScreen from './src/Screens/SendOtp/SendOtpForgotPasswordScreen';
import PaymentScreen from './src/Screens/PaymentScreen/PaymentScreen';
import OrderDetailsScreen from './src/Screens/OrderDetails/OrderDetailsScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import DeliveryScreen from './src/Screens/DeliveryScreen/DeliveryScreen';
import AddDeliveryScreen from './src/Screens/AddDeliveryScreen/AddDeliveryScreen';
import ResetForgotPasswordScreen from './src/Screens/ResetForgotPasswordScreen/ResetForgotPasswordScreen';
import Home from './src/Screens/HomeScreen/Home';
import YourOrderScreen from './src/Screens/YourOrderScreen/YourOrderScreen';
import VoucherScreen from './src/Screens/VoucherScreen/VoucherScreen';
import YourOrderDetailScreen from './src/Screens/YourOrderDetailScreen/YourOrderDetailScreen';

import { CartProvider } from './src/hooks/cartContext';

import SearchProductScreen from './src/Screens/SearchProductScreen/SearchProductScreen';
import MyTabsOrder from './src/navigation/TopTabNavigation/TopTabNavigation';
import NotificationOrderSuccess from './src/Screens/NotificationOrderSuccess/NotificationOrderSuccess';
import ChangeUserNameScreen from './src/Screens/EditProfile/components/ChangeUserNameScreen/ChangeUserNameScreen';
import ChangeEmailScreen from './src/Screens/EditProfile/components/ChangeEmailScreen/ChangeEmailScreen';
import ChangePhoneScreen from './src/Screens/EditProfile/components/ChangePhoneScreen/ChangePhoneScreen';
import ChangeAddressScreen from './src/Screens/EditProfile/components/ChangeAddressScreen/ChangeAddressScreen';
import ZaloPaymentScreen from './src/Screens/ZaloPaymentScreen/ZaloPaymentScreen';
import EvualuateScreen from './src/Screens/EvaluateScreen/EvaluateScreen';
import SettingNotificationScreen from './src/Screens/SettingNotificationScreen/SettingNotificationScreen';
import ChangePasswordScreen from './src/Screens/ChangePasswordScreen/ChangePasswordScreen';
import { PortalProvider } from '@gorhom/portal';
import ReasonScreen from './src/Screens/ReasonScreen/ReasonScreen';

// import {CartScreen} from './src/Screens';

function App() {
  const Stack = createNativeStackNavigator();
  const getTabBarVisibility = route => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'MessageScreen') {
      return false;
    }
    return true;
  };
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
    <PortalProvider>
    <UserProvider>
    <CartProvider>
    <NavigationContainer>

      <Stack.Navigator
        initialRouteName={'FisrtScreen'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="FisrtScreen"
          component={FisrtScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TopTabNavigation"
          component={MyTabsOrder}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="YourOrderScreen"
          component={YourOrderScreen}
          options={{headerShown: false}}
        />
      
         <Stack.Screen
          name="YourOrderDetailScreen"
          component={YourOrderDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SendOTPRegisterScreen"
          component={SendOTPRegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
      
        
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="BottomNavigation"
          component={BottomNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="MessageScreen"
          component={MessageScreen}
          options={({route}) => ({
            headerShown: getTabBarVisibility(route),
            tabBarIcon: ({color, size}) => (
              <Ionicons
                name="chatbox-ellipses-outline"
                color={color}
                size={size}
              />
            ),
          })}
        />
        {/* <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ResetForgotPasswordScreen"
          component={ResetForgotPasswordScreen}
          options={{headerShown: false}}
        />
        
          <Stack.Screen
            name="DetailProductScreen"
            component={DetailProductScreen}
            options={{headerShown: false}}
          />
        
         <Stack.Screen
          name="HomeScreen"
          component={Home}
          options={{headerShown : false}}
        /> 
         <Stack.Screen
          name="ProductCategory"
          component={ProductCategory}
          options={{headerShown : false}}
        />

        <Stack.Screen
          name="DetailMessage"
          component={DetailMessage}
          options={({route}) => ({
            title: route.params.userName,
            headerBackTitleVisible: false,
            headerShown: true,
          })}
        />

        <Stack.Screen
          name="SendOtpScreen"
          component={SendOtpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="OrderDetailsScreen"
          component={OrderDetailsScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="DeliveryScreen"
          component={DeliveryScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddDeliveryScreen"
          component={AddDeliveryScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VoucherScreen"
          component={VoucherScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchProductScreen"
          component={SearchProductScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NotificationOrderSuccess"
          component={NotificationOrderSuccess}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="ChangeUserNameScreen"
          component={ChangeUserNameScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangeEmailScreen"
          component={ChangeEmailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangePhoneScreen"
          component={ChangePhoneScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangeAddressScreen"
          component={ChangeAddressScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ZaloPaymentScreen"
          component={ZaloPaymentScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="EvualuateScreen"
          component={EvualuateScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="SettingNotificationScreen"
          component={SettingNotificationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ReasonScreen"
          component={ReasonScreen}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>

    </CartProvider>
    </UserProvider>
    </PortalProvider>
    </GestureHandlerRootView>
  );
}

export default App;
