import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AdminStackParamList } from '../types';
import { Colors, FontFamily } from '../configs';
import AdminHomeDrawer from './AdminHomeDrawer';
import { AdminAddCase } from '../screens';

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
        {
            name: 'AdminAddPestScreen',
            title: 'Tambah Hama',
            component: AdminAddCase,
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
                        title: screen.title,
                        headerShown: screen.title !== 'Home',
                        headerStyle: {
                            backgroundColor: Colors.tabBarColor,
                        },
                        headerTitleAlign: 'center',
                        headerTintColor: Colors.ligthTextColor,
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
