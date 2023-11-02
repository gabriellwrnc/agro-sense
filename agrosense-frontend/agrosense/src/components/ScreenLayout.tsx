import React from 'react';
import { ScrollView } from 'react-native';
import { View } from 'react-native-ui-lib';
import { Colors } from '../configs';
import { ScreenLayoutProps } from '../types';

const ScreenLayout: React.FC<ScreenLayoutProps> = ({
    backgroundColor,
    flex,
    children,
    center,
    spread,
    start,
    testId,
}) => {
    return (
        <View
            flex
            backgroundColor={
                backgroundColor === 'secondary'
                    ? Colors.secColor
                    : backgroundColor === 'light'
                    ? Colors.bgColor
                    : Colors.primaryColor
            }
            style={{
                position: 'relative',
                justifyContent: 'space-between',
            }}
            testID={testId}>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    flex: flex ? 1 : undefined,
                    padding: 20,
                    alignItems: center ? 'center' : undefined,
                    justifyContent: spread
                        ? 'space-between'
                        : center
                        ? 'center'
                        : start
                        ? 'flex-start'
                        : undefined,
                }}>
                {children}
            </ScrollView>
        </View>
    );
};

export default ScreenLayout;
