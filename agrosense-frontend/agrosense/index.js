/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import store from './src/store';
import { PaperProvider } from 'react-native-paper';

const ReduxApp = () => (
    <Provider store={store}>
        <PaperProvider>
            <App />
        </PaperProvider>
    </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
