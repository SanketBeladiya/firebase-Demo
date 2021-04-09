

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Componets/Login'
import Verify from './Componets/Verify'
import Home  from "./Componets/Home";


const Stack=createStackNavigator();


const App=()  => {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login"  component={Login}/>
        <Stack.Screen name='Verify' component={Verify}/>
        <Stack.Screen name='Home' component={Home}/>
      </Stack.Navigator>
    </NavigationContainer>
     
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;
