import React from 'react';
import { Image } from 'react-native';
import { View } from 'react-native-ui-lib';
import { CustomText, ScreenLayout } from '../../../components';
import { SignUpProps } from '../../../types';
import FormSignUp from './components/FormSignUp';

const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
    return (
        <ScreenLayout backgroundColor="light" padding={30} flex center>
            <View flex center style={{ gap: 70 }}>
                <View row centerV style={{ gap: 15 }}>
                    <Image
                        source={require('../../../../assets/images/Logo.png')}
                    />
                    <CustomText
                        color="primaryColor"
                        fontFamily="reemkufiBold"
                        fontSize="xxl"
                        text="Agrosense"
                    />
                </View>
                <FormSignUp navigation={navigation} />
            </View>
        </ScreenLayout>
    );
};

export default SignUp;
