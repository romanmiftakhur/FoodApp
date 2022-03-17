import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { Switch } from 'react-native-paper';
import Detail from "../screens/Detail";
import Home from '../screens/Home';
import Favorite from '../screens/Favorite';

const Stack = createStackNavigator();

export const HomeStack = () => {

    return(
        <Stack.Navigator
            initialRouteName='Home'
        >
            <Stack.Screen 
                name='Home' 
                component={Home}
            />
            <Stack.Screen 
                name='Detail'
                component={DetailStack}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export const FavoriteStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Favorit'
                component={Favorite}
            />
        <Stack.Screen
            name='Detail'
            component={DetailStack}
            options={{ headerShown: false }}
        />
        </Stack.Navigator>
    )
}

export const DetailStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name='nestedDetail' 
                component={Detail}
                options={({ route }) => ({ title: route.params.title })}
            />
        </Stack.Navigator>
    )
}