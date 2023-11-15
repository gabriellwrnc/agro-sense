import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthScreenStacks } from './src/navigations';
import { CustomToast } from './src/components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App: React.FC = () => {
    const queryClient = new QueryClient();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <QueryClientProvider client={queryClient}>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <AuthScreenStacks />
                    </NavigationContainer>
                    <CustomToast />
                </SafeAreaProvider>
            </QueryClientProvider>
        </GestureHandlerRootView>
    );
};

export default App;
