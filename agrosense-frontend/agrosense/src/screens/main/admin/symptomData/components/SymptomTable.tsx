import React from 'react';
import { View } from 'react-native-ui-lib';
import { Colors } from '../../../../../configs';
import { CustomText } from '../../../../../components';
import { Pressable } from 'react-native';
import { Symptom } from '../../../../../types';

type Props = {
    symptom: Symptom[];
};

const SymptomTable: React.FC<Props> = ({ symptom }) => {
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
                        text="Kode Gejala"
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
                        text="Deskripsi"
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
            {symptom.map((item, index) => {
                const itemNumbering = index + 1;

                return (
                    <View
                        key={item.symptomCode}
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
                                text={item.symptomCode}
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
                                onPress={() => console.log('pressed')}
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

export default SymptomTable;
