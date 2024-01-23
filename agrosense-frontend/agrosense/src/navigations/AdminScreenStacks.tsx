import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors, FontFamily } from '../configs';
import {
    AdminAddCase,
    AdminAddPestImage,
    AdminAddPestSymptomWeight,
    AdminCaseDetail,
    AdminUserDetail,
    AdminVerifyCase,
    AdminVerifyCaseSymptomWeight,
    AdminVerifyConstultation,
} from '../screens';
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
        {
            name: 'AdminAddPestImageScreen',
            title: 'Tambah Gambar Hama',
            component: AdminAddPestImage,
        },
        {
            name: 'AdminCaseDetailScreen',
            title: 'Detail Kasus',
            component: AdminCaseDetail,
        },
        {
            name: 'AdminVerifyCaseScreen',
            title: 'Verifikasi Kasus',
            component: AdminVerifyCase,
        },
        {
            name: 'AdminVerifyCaseSymptomWeightScreen',
            title: 'Tambah Bobot Gejala',
            component: AdminVerifyCaseSymptomWeight,
        },
        {
            name: 'AdminUserDetailScreen',
            title: 'Detail Petani',
            component: AdminUserDetail,
        },
        {
            name: 'AdminVerifyConstultationScreen',
            title: 'Verifikasi Konsultasi',
            component: AdminVerifyConstultation,
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
