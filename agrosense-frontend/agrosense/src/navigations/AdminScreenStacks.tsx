import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AdminStackParamList } from '../types';
import { AdminHome } from '../screens';
import { Colors } from 'react-native-ui-lib';
import { FontFamily } from '../configs';
import AdminHomeDrawer from './AdminHomeDrawer';

const AdminStack = createNativeStackNavigator<AdminStackParamList>();

const AdminScreenStacks = () => {
    const screens: {
        name: keyof AdminStackParamList;
        title: string;
        component: any;
    }[] = [
        {
            name: 'AdminHomeDrawer',
            title: 'Home',
            component: AdminHomeDrawer,
        },
    ];

    return (
        <AdminStack.Navigator screenOptions={{ headerShown: false }}>
            {screens.map(screen => (
                <AdminStack.Screen
                    key={screen.name}
                    name={screen.name}
                    component={screen.component}
                    options={{
                        headerShown: false,
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
        </AdminStack.Navigator>
    );
};

export default AdminScreenStacks;
