import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Splash from './Splash';
import Login from './Login';
import Framik from './Framik';
import Home from './Home';
import Showpic from './Showpic';
import Carddata from './Carddata';
import Wishlist from './Wishlist';

const stack = createStackNavigator();
export default function StackNavigation() {
 return (
        <NavigationContainer>
            <stack.Navigator initialRouteName='Splash'>
                <stack.Screen name='Splash' component={Splash} options={{headerShown:false}}></stack.Screen>
                <stack.Screen name='Login' component={Login} options={{headerShown:false}}></stack.Screen>
                <stack.Screen name='Signup' component={Framik} options={{headerShown:false}}></stack.Screen>
                <stack.Screen name='Home' component={Home} options={{headerShown:false}}></stack.Screen>
                <stack.Screen name='Showpic' component={Showpic}  options={{headerShown:false}}></stack.Screen>
                <stack.Screen name='Carddata' component={Carddata}  options={{headerShown:false}}></stack.Screen>
                <stack.Screen name='Wishlist' component={Wishlist}  options={{headerShown:false}}></stack.Screen>
            </stack.Navigator>
        </NavigationContainer>
    )
}