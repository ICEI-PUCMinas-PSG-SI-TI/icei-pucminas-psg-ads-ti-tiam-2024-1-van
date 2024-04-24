import React from "react";
import { SafeAreaProvider   } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen, Signup, WelcomeScreen } from "./Pages/index";


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
              headerTitle: '', // Remove o título
              headerBackTitleVisible: false, // Esconde o texto de volta se houver em iOS
              headerTintColor: '#000', // Cor da seta de voltar
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};



