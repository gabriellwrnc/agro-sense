import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors, FontFamily } from '../configs';
import { FarmerConsult, FarmerConsultResult } from '../screens';
import { FarmerStackParamList } from '../types';
import FarmerHomeTabNav from './FarmerHomeTabNav';

const FarmerStack = createNativeStackNavigator<FarmerStackParamList>();

const FarmerScreenStacks = () => {
    const screens: {
        name: keyof FarmerStackParamList;
        title: string;
        component: any;
    }[] = [
        {
            name: 'FarmerConsult',
            title: 'Konsultasi',
            component: FarmerConsult,
        },
        {
            name: 'FarmerConsultResult',
            title: 'Hasil Konsultasi',
            component: FarmerConsultResult,
        },
    ];

    return (
        <FarmerStack.Navigator screenOptions={{ headerShown: false }}>
            <FarmerStack.Screen
                name="FarmerHomeTab"
                component={FarmerHomeTabNav}
            />
            {screens.map(screen => (
                <FarmerStack.Screen
                    key={screen.name}
                    name={screen.name}
                    component={screen.component}
                    options={{
                        headerTitle: screen.title,
                        headerBackTitleVisible: false,
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: Colors.tabBarColor,
                        },
                        headerTitleAlign: 'center',
                        headerTintColor: Colors.secLigthTextColor,
                        headerTitleStyle: {
                            fontFamily: FontFamily.poppinsSemiBold,
                        },
                    }}
                />
            ))}
        </FarmerStack.Navigator>
    );
};

export default FarmerScreenStacks;
