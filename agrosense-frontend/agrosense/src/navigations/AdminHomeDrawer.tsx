import { createDrawerNavigator } from '@react-navigation/drawer';
import {
    AdminHomeDrawerIcon,
    AdminHomeDrawerIconActive,
    Colors,
    DataIcon,
    DataIconActive,
    FontFamily,
    FontSize,
} from '../configs';
import {
    AdminCaseData,
    AdminFarmerData,
    AdminHome,
    AdminPestData,
    AdminSymptomData,
} from '../screens';
import { AdminHomeDrawerParamList } from '../types';
import CustomDrawerContent from './components/CustomDrawerContent';

const Drawer = createDrawerNavigator<AdminHomeDrawerParamList>();

const AdminHomeDrawer = () => {
    const screens: {
        name: keyof AdminHomeDrawerParamList;
        headerTitle: string;
        drawerTitle: string;
        component: any;
        icon: {
            active: any;
            inactive: any;
        };
    }[] = [
        {
            name: 'AdminHomeScreen',
            headerTitle: 'Admin',
            drawerTitle: 'Beranda',
            component: AdminHome,
            icon: {
                active: <AdminHomeDrawerIconActive />,
                inactive: <AdminHomeDrawerIcon />,
            },
        },
        {
            name: 'AdminCaseDataScreen',
            headerTitle: 'Kasus',
            drawerTitle: 'Kasus',
            component: AdminCaseData,
            icon: {
                active: <DataIconActive />,
                inactive: <DataIcon />,
            },
        },
        {
            name: 'AdminFarmerDataScreen',
            headerTitle: 'Petani',
            drawerTitle: 'Petani',
            component: AdminFarmerData,
            icon: {
                active: <DataIconActive />,
                inactive: <DataIcon />,
            },
        },
        {
            name: 'AdminPestDataScreen',
            headerTitle: 'Hama',
            drawerTitle: 'Hama',
            component: AdminPestData,
            icon: {
                active: <DataIconActive />,
                inactive: <DataIcon />,
            },
        },
        {
            name: 'AdminSymptomDataScreen',
            headerTitle: 'Gejala',
            drawerTitle: 'Gejala',
            component: AdminSymptomData,
            icon: {
                active: <DataIconActive />,
                inactive: <DataIcon />,
            },
        },
    ];

    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: {
                    backgroundColor: Colors.bgColor,
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                },
                drawerItemStyle: {},
                drawerActiveBackgroundColor: Colors.secColor,
                drawerActiveTintColor: Colors.ligthTextColor,
                drawerLabelStyle: {
                    fontFamily: FontFamily.poppinsSemiBold,
                    fontSize: FontSize.ssm,
                },
            }}
            drawerContent={props => <CustomDrawerContent {...props} />}>
            {screens.map(screen => (
                <Drawer.Screen
                    key={screen.name}
                    name={screen.name}
                    component={screen.component}
                    options={{
                        headerTitle: screen.headerTitle,
                        title: screen.drawerTitle,
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: Colors.tabBarColor,
                            borderBottomEndRadius: 20,
                            borderBottomStartRadius: 20,
                        },
                        drawerIcon: ({ focused }) => {
                            return focused
                                ? screen.icon.active
                                : screen.icon.inactive;
                        },
                        headerTitleAlign: 'center',
                        headerTintColor: Colors.ligthTextColor,
                        headerTitleStyle: {
                            fontFamily: FontFamily.poppinsSemiBold,
                        },
                    }}
                />
            ))}
        </Drawer.Navigator>
    );
};

export default AdminHomeDrawer;
