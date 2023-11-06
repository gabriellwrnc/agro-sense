import React from 'react';
import { Image } from 'react-native';
import { View } from 'react-native-ui-lib';
import { CustomText, ScreenLayout } from '../../../components';
import { SignInProps } from '../../../types';
import FormSignIn from './components/FormSignIn';

const SignIn: React.FC<SignInProps> = ({ navigation }) => {
    return (
        <ScreenLayout backgroundColor="light" padding={30} flex center>
            <View flex center style={{ gap: 100 }}>
                <View row centerV style={{ gap: 10 }}>
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
                <FormSignIn navigation={navigation} />
            </View>
        </ScreenLayout>
    );
};

export default SignIn;
