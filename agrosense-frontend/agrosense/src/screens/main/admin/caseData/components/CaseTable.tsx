import React from 'react';
import { Badge, View } from 'react-native-ui-lib';
import { CustomText } from '../../../../../components';
import { Pressable } from 'react-native';
import { Colors } from '../../../../../configs';
import { Case } from '../../../../../types';

type Props = {
    cases: Case[];
};

const CaseTable: React.FC<Props> = ({ cases }) => {
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
                        text="Kode Kasus"
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
            {cases.map((item, index) => {
                const itemNumbering = index + 1;

                return (
                    <View
                        key={item.caseCode}
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
                                text={item.caseCode}
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
                        <View center style={{ flex: 1.5 }}>
                            <Pressable
                                onPress={() => console.log('detail')}
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
                            {item.status === 'unverified' && (
                                <View
                                    style={{
                                        position: 'absolute',
                                        right: -4,
                                        top: -6,
                                    }}>
                                    <Badge
                                        label={'!'}
                                        size={18}
                                        backgroundColor={Colors.boldErrorColor}
                                    />
                                </View>
                            )}
                        </View>
                    </View>
                );
            })}
        </View>
    );
};

export default CaseTable;
