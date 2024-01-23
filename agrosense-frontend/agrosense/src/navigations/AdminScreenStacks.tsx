import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors, FontFamily } from '../configs';
import { AdminAddCase, AdminAddPestSymptomWeight } from '../screens';
import { AdminStackParamList } from '../types';
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
        {
            name: 'AdminAddPestScreen',
            title: 'Tambah Hama',
            component: AdminAddCase,
        },
        {
            name: 'AdminAddPestSymptomWeightScreen',
            title: 'Tambah Bobot Gejala',
            component: AdminAddPestSymptomWeight,
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
