import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootParamList } from '../types';
import { AuthScreenStacks, FarmerScreenStacks } from '.';
import { useDispatch } from 'react-redux';

const RootStack = createNativeStackNavigator<RootParamList>();

const RootStacks: React.FC = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen
                name="AuthScreenStack"
                component={AuthScreenStacks}
            />
            <RootStack.Screen
                name="FarmerScreenStacks"
                component={FarmerScreenStacks}
            />
        </RootStack.Navigator>
    );
};

export default RootStacks;
