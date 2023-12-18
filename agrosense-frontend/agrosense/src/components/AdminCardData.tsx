import React from 'react';
import { View } from 'react-native-ui-lib';
import { Colors } from '../configs';
import CustomText from './CustomText';
import { AdminCardDataProps } from '../types';
import { Pressable } from 'react-native';

const AdminCardData: React.FC<AdminCardDataProps> = ({
    title,
    totalData,
    onPress,
}) => {
    return (
        <Pressable
            onPress={onPress}
            style={{
                backgroundColor: Colors.primaryColor,
                paddingHorizontal: 16,
                paddingVertical: 24,
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
            <CustomText
                color="ligthTextColor"
                fontFamily="poppinsSemiBold"
                fontSize="xl2"
                text={title}
                textAlign="center"
            />
            <View centerH>
                <CustomText
                    color="secLigthTextColor"
                    fontFamily="poppinsSemiBold"
                    fontSize="xl"
                    text="Jumlah"
                />
                <CustomText
                    color="secLigthTextColor"
                    fontFamily="poppinsSemiBold"
                    fontSize="lg"
                    text={totalData.toString()}
                />
            </View>
        </Pressable>
    );
};

export default AdminCardData;
