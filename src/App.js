import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  AlunoLocationScreen,
  LoginScreen,
  Signup,
  WelcomeScreen,
  HomeAluno,
  HomeMotorista,
  ForgotPasswordScreen,
  EmailConfirmationScreen,
  LocationScreen,
  SettingsScreen,
  EditScreen,
  EditProfile,
  GerenciarAlunos,
  ConfigProfileMotorista,
} from "./Pages";
import { FlatList } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: true,
              headerTransparent: true, // Torna o cabeçalho transparente
              headerTitle: "", // Remove o título
              headerBackTitleVisible: false, // Esconde o texto de volta se houver em iOS
              headerTintColor: "#000", // Cor da seta de voltar
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerShown: true,
              headerTransparent: true,
              headerTitle: "",
              headerBackTitleVisible: false,
              headerTintColor: "#000",
            }}
          />

          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
            options={{
              headerShown: true,
              headerTransparent: true,
              headerTitle: "",
              headerBackTitleVisible: false,
              headerTintColor: "#000",
            }}
          />

          <Stack.Screen
            name="EmailConfirmationScreen"
            component={EmailConfirmationScreen}
            options={{
              headerShown: true,
              headerTransparent: true,
              headerTitle: "",
              headerBackTitleVisible: false,
              headerTintColor: "#000",
            }}
          />
          <Stack.Screen
            name="HomeAluno"
            component={HomeAluno}
            options={{
              headerShown: false,
              headerTransparent: true,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{
              headerShown: true,
              headerTransparent: true,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="AlunoLocationScreen"
            component={AlunoLocationScreen}
            options={{
              headerShown: true,
              headerTransparent: true,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="LocationScreen"
            component={LocationScreen}
            options={{
              headerShown: true,
              headerTransparent: true,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="EditScreen"
            component={EditScreen}
            options={{
              headerShown: true,
              headerTransparent: true,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              headerShown: true,
              headerTransparent: true,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="HomeMotorista"
            component={HomeMotorista}
            options={{
              headerShown: false,
              headerTransparent: true,
              headerTitle: "",
            }}
          />
          <Stack.Screen name="GerenciarAlunos" component={GerenciarAlunos} />
          <Stack.Screen
            name="ConfigProfileMotorista"
            component={ConfigProfileMotorista}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
