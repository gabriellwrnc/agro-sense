import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FarmerStackParamList } from '../types';
import FarmerHomeTabNav from './FarmerHomeTabNav';

const FarmerStack = createNativeStackNavigator<FarmerStackParamList>();

const FarmerScreenStacks = () => {
    return (
        <FarmerStack.Navigator screenOptions={{ headerShown: false }}>
            <FarmerStack.Screen
                name="FarmerHomeTab"
                component={FarmerHomeTabNav}
            />
        </FarmerStack.Navigator>
    );
};

export default FarmerScreenStacks;
