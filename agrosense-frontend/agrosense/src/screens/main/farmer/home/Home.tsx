import React from 'react';
import { FlatList, Pressable } from 'react-native';
import { View } from 'react-native-ui-lib';
import { CustomText, HamaCard, ScreenLayout } from '../../../../components';
import {
    Colors,
    KonsultasiIcon,
    ROLE,
    TOKEN,
    getDataFromLocalStorage,
} from '../../../../configs';
import { CarouselHome, TopBarHome } from './components';
import { FarmerHomeProps } from '../../../../types';

const Home: React.FC<FarmerHomeProps> = ({ navigation }) => {
    const dummyShip: {
        _id: string;
        imageUrl: string;
        name: string;
        italicName: string;
    }[] = [
        {
            _id: '1',
            imageUrl: 'https://picsum.photos/375/500?random=1',
            name: 'Kepinding Tanah',
            italicName: 'Scotinophara Coarctata',
        },
        {
            _id: '2',
            imageUrl: 'https://picsum.photos/375/500?random=2',
            name: 'Kepinding Air',
            italicName: 'Scotinophara Coarctata',
        },
        {
            _id: '3',
            imageUrl: 'https://picsum.photos/375/500?random=3',
            name: 'Kepinding Api',
            italicName: 'Scotinophara Coarctata',
        },
        {
            _id: '4',
            imageUrl: 'https://picsum.photos/375/500?random=4',
            name: 'Kepinding Udara',
            italicName: 'Scotinophara Coarctata',
        },
    ];

    React.useEffect(() => {
        getDataFromLocalStorage(TOKEN).then(res => {
            return console.log(res);
        });
        getDataFromLocalStorage(ROLE).then(res => {
            return console.log(res);
        });
    });
    return (
        <>
            <FlatList
                data={['']}
                keyExtractor={() => 'dummyKey'}
                contentContainerStyle={{ paddingBottom: 70 }}
                renderItem={() => (
                    <>
                        <TopBarHome />
                        <ScreenLayout backgroundColor="light" padding={10}>
                            <CarouselHome />
                            <View>
                                <CustomText
                                    color="primaryColor"
                                    fontFamily="reemkufiBold"
                                    fontSize="xxl"
                                    text="Daftar Hama"
                                />
                                <FlatList
                                    data={dummyShip}
                                    keyExtractor={item => item._id}
                                    renderItem={({ item }) => (
                                        <HamaCard
                                            imageUrl={item.imageUrl}
                                            name={item.name}
                                            italicName={item.italicName}
                                            onPress={() =>
                                                console.log(
                                                    'pressed',
                                                    item.name,
                                                )
                                            }
                                        />
                                    )}
                                    numColumns={2}
                                    contentContainerStyle={{
                                        gap: 10,
                                    }}
                                    columnWrapperStyle={{
                                        justifyContent: 'space-between',
                                        marginTop: 10,
                                    }}
                                />
                            </View>
                        </ScreenLayout>
                    </>
                )}
            />
            <Pressable
                onPress={() => navigation.navigate('FarmerConsult')}
                style={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 14,
                    backgroundColor: Colors.secColor,
                    borderTopLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    right: 20,
                    bottom: 80,
                }}>
                <KonsultasiIcon />
            </Pressable>
        </>
    );
};

export default Home;
