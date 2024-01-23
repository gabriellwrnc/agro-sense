import React from 'react';
import { Pressable } from 'react-native';
import { View } from 'react-native-ui-lib';
import { CustomText } from '../../../../../components';
import { Colors } from '../../../../../configs';
import {
    AdminHomeDrawerParamList,
    AdminStackParamList,
    Farmer,
} from '../../../../../types';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type Props = {
    farmer: Farmer[];
    navigation: DrawerNavigationProp<
        AdminStackParamList & AdminHomeDrawerParamList,
        'AdminHomeScreen',
        undefined
    >;
};

const FarmerTable: React.FC<Props> = ({ farmer, navigation }) => {
    return (
        <View
            style={{
                gap: 10,
            }}>
            <View
                row
                style={{
                    backgroundColor: Colors.secColor,
                    borderRadius: 10,
                    padding: 10,
                }}>
                <View
                    centerV
                    style={{
                        flex: 1,
                    }}>
                    <CustomText
                        color="primaryColor"
                        fontFamily="reemkufiBold"
                        fontSize="md"
                        text="No"
                        textAlign="center"
                    />
                </View>
                <View
                    centerV
                    style={{
                        flex: 2.5,
                    }}>
                    <CustomText
                        color="primaryColor"
                        fontFamily="reemkufiBold"
                        fontSize="md"
                        text="Nama"
                        textAlign="center"
                    />
                </View>
                <View
                    centerV
                    style={{
                        flex: 2.5,
                    }}>
                    <CustomText
                        color="primaryColor"
                        fontFamily="reemkufiBold"
                        fontSize="md"
                        text="Jumlah Konsultasi"
                        textAlign="center"
                    />
                </View>

                <View centerV style={{ flex: 1.5 }}>
                    <CustomText
                        color="primaryColor"
                        fontFamily="reemkufiBold"
                        fontSize="md"
                        text="Aksi"
                        textAlign="center"
                    />
                </View>
            </View>
            {farmer.map((item, index) => {
                const userNumbering = index + 1;
                const actionPressed = () => {
                    navigation.navigate('AdminUserDetailScreen', {
                        email: item.email,
                    });
                };

                return (
                    <View
                        key={item._id}
                        row
                        style={{
                            backgroundColor: Colors.softGreyColor,
                            borderRadius: 10,
                            padding: 10,
                        }}>
                        <View
                            center
                            style={{
                                flex: 1,
                            }}>
                            <CustomText
                                color="primaryColor"
                                fontFamily="reemkufiRegular"
                                fontSize="md"
                                text={userNumbering.toString()}
                            />
                        </View>
                        <View
                            centerV
                            style={{
                                flex: 2.5,
                            }}>
                            <CustomText
                                color="primaryColor"
                                fontFamily="reemkufiRegular"
                                fontSize="md"
                                text={item.name}
                                ellipsizeMode
                            />
                        </View>
                        <View
                            center
                            style={{
                                flex: 2.5,
                            }}>
                            <CustomText
                                color="primaryColor"
                                fontFamily="reemkufiRegular"
                                fontSize="md"
                                text={item.consultationCount.toString()}
                            />
                        </View>
                        <View center style={{ flex: 1.5 }}>
                            <Pressable
                                onPress={actionPressed}
                                style={{
                                    borderColor: Colors.primaryColor,
                                    borderWidth: 1.5,
                                    borderRadius: 6,
                                    paddingHorizontal: 5,
                                }}>
                                <CustomText
                                    color="primaryColor"
                                    fontFamily="reemkufiRegular"
                                    fontSize="md"
                                    text="Detail"
                                />
                            </Pressable>
                        </View>
                    </View>
                );
            })}
        </View>
    );
};

export default FarmerTable;
