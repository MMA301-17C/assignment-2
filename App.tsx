import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';

import LittleLemonHeader from './components/LittleLemonHeader';
import LittleLemonFooter from './components/LittleLemonFooter';
import MenuScreen from './screens/Menu';
import WelcomeScreen from './screens/Welcome';
import LoginScreen from './screens/Login';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <LittleLemonHeader />
        <Stack.Navigator
          screenOptions={({ route, navigation }) => ({
            headerTitleAlign: 'center', 
            headerTitleStyle: {
              fontSize: 20,
              color: 'black', 
            },
            headerBackTitleVisible: true,
            headerBackTitle: getPreviousScreenTitle(route, navigation),
            headerBackTitleStyle: {
              fontSize: 15, 
              color: '#007AFF',
            },
            headerTintColor: '#007AFF',
          })}
        >
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'Welcome' }} />
          <Stack.Screen name="Menu" component={MenuScreen} options={{ title: 'Menu' }} />
        </Stack.Navigator>
      </View>
      <View style={styles.footerContainer}>
        <LittleLemonFooter />
      </View>
    </NavigationContainer>
  );
}

const getPreviousScreenTitle = (route: any, navigation: any) => {
  const routes = navigation.getState().routes;
  const currentIndex = routes.findIndex((r: any) => r.key === route.key);
  if (currentIndex > 0) {
    return routes[currentIndex - 1].name;
  }
  return '';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  footerContainer: { backgroundColor: '#333333' },
});