import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OrderDelivered from '../../Screens/YourOrderScreen/component/OrderDelivered/OrderDelivered';
import OrderDelivering from '../../Screens/YourOrderScreen/component/OrderDelivering/OrderDelivering';
import WaitForCofirm from '../../Screens/YourOrderScreen/component/WaitForComfirm/WaitForComfirm';
import Confirm from '../../Screens/YourOrderScreen/component/Confirm/Confirm';
import ReturnOrderScreen from '../../Screens/YourOrderScreen/component/Return/ReturnOrderScreen';
import CancleScreen from '../../Screens/YourOrderScreen/component/Cancle/CancleScreen';
import {NavigationContainer} from '@react-navigation/native';
import { TabView, SceneMap } from 'react-native-tab-view';
import IconAndesign from  'react-native-vector-icons/AntDesign';
import IconMT from  'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';
import { useState } from 'react';



export default function MyTabsOrder() {
  const Tab = createMaterialTopTabNavigator();
  
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: true,
      animationEnabled : false,
      tabBarLabelStyle : { fontSize : 12, fontWeight : "bold" }
    }}
   
    >
      <Tab.Screen
        name="chờ xác nhận"
        component={WaitForCofirm}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({focused, color, size}) => (
            <IconMT name="ticket-confirmation-outline" color={focused ? COLORS.App : color} size={24} />
          ),
        }}
      />
         <Tab.Screen
        name="Xác nhận"
        component={Confirm}
        options={{
          tabBarLabel: 'Xác nhận',
          tabBarIcon: ({focused, color, size}) => (
            <IconAndesign name="profile" color={focused ? COLORS.App : color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Đang giao"
        component={OrderDelivering}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({focused, color, size}) => (
            <IconMT name="truck-fast-outline" color={focused ? COLORS.App : color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Đã giao"
        component={OrderDelivered}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({focused, color, size}) => (
            <IconMT name="text-box-check-outline" color={focused ? COLORS.App : color} size={24} />
          ),
        }}
      />
       <Tab.Screen
        name="Đơn Hủy"
        component={CancleScreen}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({focused, color, size}) => (
            <IconMT name="text-box-check-outline" color={focused ? COLORS.App : color} size={24} />
          ),
        }}
      />
         <Tab.Screen
        name="Đơn Trả"
        component={ReturnOrderScreen}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({focused, color, size}) => (
            <IconMT name="text-box-check-outline" color={focused ? COLORS.App : color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

