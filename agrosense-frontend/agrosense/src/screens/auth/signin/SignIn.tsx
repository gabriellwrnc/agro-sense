import React from 'react';
import { Text } from 'react-native-ui-lib';
import { ScreenLayout } from '../../../components';

const SignIn: React.FC = () => {
    return (
        <ScreenLayout backgroundColor="light" flex center>
            <Text>Signin Screen</Text>
        </ScreenLayout>
    );
};

export default SignIn;
