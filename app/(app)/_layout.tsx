import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Text } from "react-native";
import { useFonts } from "expo-font";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useInitializeClient } from "@/src/graphql/useInitClient";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSession } from "@/ctx";

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const { session, sessionLoading } = useSession();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const client = useInitializeClient();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!client) {
        return null;
    }

  if (!loaded) {
    return null;
  }

  if (sessionLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/index" />;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <ApolloProvider client={client}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack> 
        </ApolloProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
