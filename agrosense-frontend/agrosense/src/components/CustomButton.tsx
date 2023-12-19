import React from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import CustomText from './CustomText';
import { CustomButtonProps } from '../types';
import { Colors } from '../configs';
import { View } from 'react-native-ui-lib';

const CustomButton: React.FC<CustomButtonProps> = ({
    disable = false,
    onPress,
    text,
    type,
    isSubmitting,
}) => {
    let backgroundColor;

    if (disable) {
        backgroundColor =
            type === 'primary' ? Colors.primaryBgColor : Colors.bgColor;
    } else {
        backgroundColor =
            type === 'primary' ? Colors.primaryColor : Colors.bgColor;
    }

    return (
        <Pressable
            style={{
                backgroundColor,
                paddingVertical: 6,
                paddingHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 6,
                borderWidth: type === 'secondary' ? 2 : 0,
                borderColor: Colors.primaryColor,
            }}
            disabled={disable}
            onPress={onPress}>
            {isSubmitting ? (
                <View style={{ paddingVertical: 6 }}>
                    <ActivityIndicator
                        color={
                            type === 'primary'
                                ? Colors.bgColor
                                : Colors.primaryColor
                        }
                        size="small"
                    />
                </View>
            ) : (
                <CustomText
                    color={type === 'primary' ? 'bgColor' : 'primaryColor'}
                    fontFamily="reemkufiMedium"
                    fontSize="lg"
                    text={text}
                />
            )}
        </Pressable>
    );
};

export default CustomButton;
