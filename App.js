import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Search from "./src/views/Search";
import SearchResults from "./src/views/SearchResults";
import Business from "./src/views/business/Business";
import { useFonts, PublicSans_400Regular, PublicSans_500Medium, PublicSans_600SemiBold, PublicSans_700Bold } from "@expo-google-fonts/public-sans";
import { RedHatDisplay_400Regular, RedHatDisplay_500Medium, RedHatDisplay_700Bold } from "@expo-google-fonts/red-hat-display";
import { LogBox } from "react-native";
import AppLoading from "expo-app-loading";
const Stack = createNativeStackNavigator();

export default function App() {
  const [text, onChangeText] = React.useState("");
  let [fontsLoaded] = useFonts({
    PublicSans_400Regular,
    PublicSans_500Medium,
    PublicSans_600SemiBold,
    PublicSans_700Bold,
    RedHatDisplay_400Regular,
    RedHatDisplay_500Medium,
    RedHatDisplay_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name='Search' component={Search}></Stack.Screen>
        <Stack.Screen name='SearchResults' component={SearchResults} options={{ title: "Search Results" }}></Stack.Screen>
        <Stack.Screen name='Business' component={Business}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    width: "80%",
  },
});
