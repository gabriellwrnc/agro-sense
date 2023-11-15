import React from 'react';
import { Text, View } from 'react-native-ui-lib';
import { ROLE, TOKEN, getDataFromLocalStorage } from '../../../../configs';

const Home = () => {
    React.useEffect(() => {
        getDataFromLocalStorage(TOKEN).then(res => {
            return console.log(res);
        });
        getDataFromLocalStorage(ROLE).then(res => {
            return console.log(res);
        });
    });
    return (
        <View>
            <Text>Farmer Home Screen</Text>
        </View>
    );
};

export default Home;
