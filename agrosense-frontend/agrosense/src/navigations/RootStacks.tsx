import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AdminScreenStacks, AuthScreenStacks, FarmerScreenStacks } from '.';
import { RootParamList, RootState } from '../types';
import { ROLE, getDataFromLocalStorage } from '../configs';
import { userRootNavDetailsSlice } from '../slices';

const RootStack = createNativeStackNavigator<RootParamList>();

const RootStacks: React.FC = () => {
    const dispatch = useDispatch();
    const { isLoggedIn, role } = useSelector(
        (state: RootState) => state.userRootNavdetails,
    );
    const { setLoggedIn } = userRootNavDetailsSlice.actions;
    let screenComponent;

    if (isLoggedIn) {
        screenComponent =
            role === 'farmer' ? (
                <RootStack.Screen
                    name="FarmerScreenStacks"
                    component={FarmerScreenStacks}
                />
            ) : (
                <RootStack.Screen
                    name="AdminScreenStacks"
                    component={AdminScreenStacks}
                />
            );
    } else {
        screenComponent = (
            <RootStack.Screen
                name="AuthScreenStack"
                component={AuthScreenStacks}
            />
        );
    }

    React.useEffect(() => {
        console.log('isLoggedIn', isLoggedIn);
        console.log('role', role);
        getDataFromLocalStorage(ROLE).then(res => {
            return res
                ? dispatch(setLoggedIn({ isLoggedIn: true, role: res.role }))
                : null;
        });
    }, []);

    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {screenComponent}
        </RootStack.Navigator>
    );
};

export default RootStacks;
