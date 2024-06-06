import React from "react";
import { SafeAreaProvider   } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SettingsScreen, LocationScreen, EmailConfirmationScreen, ForgotPasswordScreen, HomeAluno, LoginScreen, Signup, WelcomeScreen, EditScreen } from "../Pages/index";

const Stack = createNativeStackNavigator();

export default function App(){
  return(
  <SafeAreaProvider >
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="EmailConfirmationScreen" component={EmailConfirmationScreen} />
        <Stack.Screen name="HomeAluno" component={HomeAluno}/>
        <Stack.Screen name="LocationScreen" component={LocationScreen}/>
        <Stack.Screen name="SettingsScreen" component={SettingsScreen}/>
        <Stack.Screen name="EditScreen" component={EditScreen}/>
      </Stack.Navigator>
      </NavigationContainer>
  </SafeAreaProvider >
  
  );
};


