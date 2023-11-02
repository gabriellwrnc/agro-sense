import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthScreenStacks } from './src/navigations';


const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthScreenStacks />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}



export default App;
