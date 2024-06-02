// components/BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeAluno from '../Pages/HomeAluno';
import SettingsScreen from '../Pages/SettingsScreen';
import LocationScreen from '../Pages/LocationScreen';
import EditScreen from '../Pages/EditScreen';
import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          width: 390, // Ajuste a largura conforme a necessidade do layout do seu dispositivo
          height: 59,
          backgroundColor: '#D9D9D9',
          borderTopColor: 'transparent',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          left: 0,
          bottom: 0, // Ajuste conforme necessário para posicionar corretamente na tela
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeAluno}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Location"
        component={LocationScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="map-pin" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Edit"
        component={EditScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="edit" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
