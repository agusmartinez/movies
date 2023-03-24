import React from 'react';
import LogInScreen from './src/screens/LogInScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MoviesScreen from './src/screens/MoviesScreen';
import MovieShowScreen from './src/screens/MovieShowScreen';

export type RootParamList = {
  LogIn: undefined;
  Movies: undefined;
  MovieShow: {id: Number};
};
const Stack = createNativeStackNavigator<RootParamList>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LogIn"
          component={LogInScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Movies"
          component={MoviesScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MovieShow"
          component={MovieShowScreen}
          options={{headerTitle: ''}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
