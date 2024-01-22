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
import { FarmerHomeProps, Pest } from '../../../../types';
import { useGetAllPest } from '../../../../hooks';
import { handleAxiosErr } from '../../../../utils';

const Home: React.FC<FarmerHomeProps> = ({ navigation }) => {
    const mutationGetAllPest = useGetAllPest();
    const [pests, setPests] = React.useState<Pest[]>([]);
    const pestImage = pests.map(pest => {
        if (pest.imageUrl) {
            return pest.imageUrl;
        } else {
            return 'https://firebasestorage.googleapis.com/v0/b/shiphire-fdb0e.appspot.com/o/default-pest.png?alt=media&token=9810dd70-f972-4b23-b762-6187e7c8d089';
        }
    });
    const carouselHomeImageUrls = pestImage.slice(2, 7);

    React.useEffect(() => {
        getDataFromLocalStorage(TOKEN).then(res => {
            return console.log(res);
        });
        getDataFromLocalStorage(ROLE).then(res => {
            return console.log(res);
        });
        mutationGetAllPest.mutate(undefined, {
            onSuccess: resp => {
                setPests(resp.data.data);
            },
            onError: err => {
                handleAxiosErr(err);
            },
        });
    }, []);
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
                            <CarouselHome imageUrls={carouselHomeImageUrls} />
                            <View>
                                <CustomText
                                    color="primaryColor"
                                    fontFamily="reemkufiBold"
                                    fontSize="xxl"
                                    text="Daftar Hama"
                                />
                                <FlatList
                                    data={pests}
                                    keyExtractor={item => item.pestCode}
                                    renderItem={({ item }) => {
                                        const italicNameMatch =
                                            /\((.*?)\)/.exec(item.name);
                                        const italicName = italicNameMatch
                                            ? italicNameMatch[1]
                                            : '';
                                        const pestImage = item.imageUrl
                                            ? item.imageUrl
                                            : 'https://firebasestorage.googleapis.com/v0/b/shiphire-fdb0e.appspot.com/o/default-pest.png?alt=media&token=9810dd70-f972-4b23-b762-6187e7c8d089';

                                        return (
                                            <HamaCard
                                                imageUrl={pestImage}
                                                name={item.name}
                                                italicName={italicName}
                                                onPress={() =>
                                                    console.log(
                                                        'pressed',
                                                        item.name,
                                                    )
                                                }
                                            />
                                        );
                                    }}
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
