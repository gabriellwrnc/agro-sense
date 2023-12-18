import { View } from 'react-native-ui-lib';
import { AdminCardData, ScreenLayout } from '../../../../components';

const Home: React.FC = () => {
    return (
        <ScreenLayout backgroundColor="light">
            <View
                style={{
                    gap: 10,
                }}>
                <AdminCardData
                    onPress={() => console.log('Kasus')}
                    title="Kasus"
                    totalData={10}
                />
                <AdminCardData
                    onPress={() => console.log('Pengguna')}
                    title="Pengguna"
                    totalData={19}
                />
                <AdminCardData
                    onPress={() => console.log('Hama')}
                    title="Hama"
                    totalData={22}
                />
                <AdminCardData
                    onPress={() => console.log('Gejala')}
                    title="Gejala"
                    totalData={32}
                />
            </View>
        </ScreenLayout>
    );
};

export default Home;
