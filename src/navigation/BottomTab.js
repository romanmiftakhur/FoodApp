import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FavoriteStack, HomeStack } from './StackTab';


const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
            <Tab.Navigator
                initialRouteName="beranda"
                screenOptions={{
                    tabBarActiveTintColor: '#e91e63',
                    tabBarStyle: { bottom: 0, position: 'absolute' },
                    
                }}
            >
                <Tab.Screen
                    name="beranda"
                    component={HomeStack}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons name="home" color={color} size={30} />
                        ),
                        unmountOnBlur: true,
                        headerShown: false
                    }}
                />
                {/* <Tab.Screen
                    name="cari"
                    component={SearchStack}
                    options={{
                        tabBarLabel: 'Cari',
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons name="search" color={color} size={33} />
                        ),
                        unmountOnBlur: true,
                        headerShown: false
                    }}
                /> */}
                <Tab.Screen
                    name="favorit"
                    component={FavoriteStack}
                    options={{
                        tabBarLabel: 'Favorit',
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons name="favorite" color={color} size={30} />
                        ),
                        unmountOnBlur: true,
                        headerShown: false
                    }}
                />
            </Tab.Navigator>
    );
}

export default BottomTabs;