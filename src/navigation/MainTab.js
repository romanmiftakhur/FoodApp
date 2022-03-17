import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './BottomTab';

export default function MainTab() {
    return (
        <NavigationContainer>
            <BottomTab />
        </NavigationContainer>
    )
}