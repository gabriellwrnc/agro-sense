import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FarmerHome } from '../screens';
import { FarmerParamList } from '../types';

const FarmerStack = createNativeStackNavigator<FarmerParamList>();

const FarmerScreenStacks = () => {
    return (
        <FarmerStack.Navigator screenOptions={{ headerShown: false }}>
            <FarmerStack.Screen
                name="FarmerHomeScreen"
                component={FarmerHome}
            />
        </FarmerStack.Navigator>
    );
};

export default FarmerScreenStacks;
