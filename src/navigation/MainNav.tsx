import React, {ComponentType} from 'react';
import MainScreen from '../screens/MainScreen';
import DetailedCharScreen from '../screens/DetailedCharInfoScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MainNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#f6f5f3',
        },
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen
        name="DetailedCharInfoScreen"
        component={DetailedCharScreen as ComponentType}
      />
    </Stack.Navigator>
  );
};

export default MainNav;
