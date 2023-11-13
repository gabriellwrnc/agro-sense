import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthScreenStacks } from './src/navigations';

const App: React.FC = () => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <AuthScreenStacks />
                </NavigationContainer>
            </SafeAreaProvider>
        </QueryClientProvider>
    );
};

export default App;
