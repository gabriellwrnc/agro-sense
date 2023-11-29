import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import {
    Colors,
    FontFamily,
    FontSize,
    HistoryIcon,
    HistoryIconActive,
    HomeIcon,
    HomeIconActive,
    NotifIcon,
    NotifIconActive,
} from '../configs';
import { FarmerHistory, FarmerHome, FarmerNotif } from '../screens';
import { FarmerHomeTabParamList } from '../types';

const Tab = createBottomTabNavigator<FarmerHomeTabParamList>();

const FarmerHomeTabNav: React.FC = () => {
    const iconMapping: {
        [key: string]: {
            active: any;
            inactive: any;
        };
    } = {
        FarmerHome: {
            active: <HomeIconActive />,
            inactive: <HomeIcon />,
        },
        FarmerHistory: {
            active: <HistoryIconActive />,
            inactive: <HistoryIcon />,
        },
        FarmerNotif: {
            active: <NotifIconActive />,
            inactive: <NotifIcon />,
        },
    };
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    const { active, inactive } = iconMapping[route.name] || {};

                    if (active && inactive) {
                        const source = focused ? active : inactive;

                        return (
                            <View
                                style={{
                                    justifyContent: 'center',
                                }}>
                                {source}
                            </View>
                        );
                    }

                    return null;
                },
                tabBarIconStyle: { maxWidth: 20 },
                tabBarLabel: ({ focused }) => (
                    <Text
                        style={{
                            display: focused ? 'flex' : 'none',
                            fontSize: FontSize.sm,
                            fontFamily: FontFamily.poppinsMedium,
                            color: Colors.primaryLightColor,
                        }}>
                        {focused
                            ? route.name === 'FarmerHome'
                                ? 'Beranda'
                                : route.name === 'FarmerHistory'
                                ? 'Riwayat'
                                : 'Notifikasi'
                            : null}
                    </Text>
                ),
                tabBarStyle: {
                    height: 70,
                    position: 'absolute',
                    elevation: 10,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: Colors.tabBarColor,
                    display:
                        route.name === 'FarmerHome' ||
                        route.name === 'FarmerNotif' ||
                        route.name === 'FarmerHistory'
                            ? 'flex'
                            : 'none',
                },
                tabBarButton: ({ onPress, children, accessibilityState }) => {
                    return (
                        <Pressable
                            onPress={onPress}
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: Colors.tabBarColor,
                                borderRadius: 20,
                            }}>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                {accessibilityState!!.selected && (
                                    <View
                                        style={{
                                            width: 40,
                                            height: 6,
                                            borderBottomLeftRadius: 10,
                                            borderBottomRightRadius: 10,
                                            backgroundColor:
                                                Colors.primaryLightColor,
                                            marginBottom: 6,
                                        }}
                                    />
                                )}
                                {children}
                            </View>
                        </Pressable>
                    );
                },
            })}>
            <Tab.Screen
                name="FarmerHistory"
                component={FarmerHistory}
                options={{
                    unmountOnBlur: true,
                }}
            />
            <Tab.Screen
                name="FarmerHome"
                component={FarmerHome}
                options={{
                    unmountOnBlur: true,
                }}
            />
            <Tab.Screen
                name="FarmerNotif"
                component={FarmerNotif}
                options={{
                    unmountOnBlur: true,
                }}
            />
        </Tab.Navigator>
    );
};

export default FarmerHomeTabNav;
