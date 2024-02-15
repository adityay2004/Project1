import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, {  } from "react";
import { View } from "react-native";
import Home from "./Screen/Home";
import ShowAddCard from "./Screen/ShowAddCard";
import ShowAddWishlist from "./Screen/ShowAddWishlist";



const StackNavigation = () => {
    const stack=createStackNavigator();
       return (
            <NavigationContainer>
                <stack.Navigator>
                    <stack.Screen name="Home" component={Home} options={{ headerShown: false }}></stack.Screen>
                    <stack.Screen name="ShowAddCard" component={ShowAddCard} options={{ headerShown: false }}></stack.Screen>
                    <stack.Screen name="ShowAddWishlist" component={ShowAddWishlist} options={{ headerShown: false }}></stack.Screen>
                    
                </stack.Navigator>
            </NavigationContainer>
    
    )
}

export default StackNavigation;


//  npm i @reduxjs/toolkit react-redux redux