import React from 'react';
import { Pressable } from 'react-native';
import { View } from 'react-native-ui-lib';
import { CustomText } from '../../../../../components';
import { Colors } from '../../../../../configs';
import { Pest } from '../../../../../types';

type Props = {
    pest: Pest[];
};

const PestTable: React.FC<Props> = ({ pest }) => {
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
                        text="Kode Hama"
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
            {pest.map((item, index) => {
                const itemNumbering = index + 1;

                return (
                    <View
                        key={item.pestCode}
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
                                text={itemNumbering.toString()}
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
                                text={item.pestCode}
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
                                text={item.name}
                                ellipsizeMode
                            />
                        </View>
                        <View center style={{ flex: 1.5 }}>
                            <Pressable
                                onPress={() =>
                                    console.log(item.name, 'pressed')
                                }
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

export default PestTable;
