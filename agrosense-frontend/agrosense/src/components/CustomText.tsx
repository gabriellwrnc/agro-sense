import React from 'react';
import { Text } from 'react-native';
import { Colors, FontFamily, FontSize } from '../configs';
import { CustomTextProps } from '../types';

const CustomText: React.FC<CustomTextProps> = ({
    color,
    fontFamily,
    fontSize,
    text,
    ellipsizeMode = false,
}) => {
    return (
        <Text
            numberOfLines={ellipsizeMode ? 1 : 0}
            ellipsizeMode={ellipsizeMode ? 'tail' : 'head'}
            style={{
                fontFamily: `${FontFamily[fontFamily]}`,
                fontSize: FontSize[fontSize],
                color: Colors[color],
            }}>
            {text}
        </Text>
    );
};

export default CustomText;
