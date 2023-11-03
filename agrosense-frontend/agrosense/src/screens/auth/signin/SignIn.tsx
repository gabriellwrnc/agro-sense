import React from 'react';
import { Text } from 'react-native-ui-lib';
import { ScreenLayout } from '../../../components';
import { FontFamily, FontSize } from '../../../configs';

const SignIn: React.FC = () => {
    return (
        <ScreenLayout backgroundColor="light" flex center>
            <Text
                style={{
                    fontFamily: FontFamily.reemkufiBold,
                    fontSize: FontSize.xl,
                }}>
                Reemkufi Bold
            </Text>
            <Text
                style={{
                    fontFamily: FontFamily.reemkufiRegular,
                    fontSize: FontSize.xl,
                }}>
                Reemkufi Regular
            </Text>
            <Text
                style={{
                    fontFamily: FontFamily.poppinsBold,
                    fontSize: FontSize.xl,
                }}>
                Poppins Bold
            </Text>
            <Text
                style={{
                    fontFamily: FontFamily.poppinsRegular,
                    fontSize: FontSize.xl,
                }}>
                Poppins Regular
            </Text>
        </ScreenLayout>
    );
};

export default SignIn;
