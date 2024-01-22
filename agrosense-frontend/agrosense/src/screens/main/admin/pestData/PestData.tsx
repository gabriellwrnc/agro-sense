import { SearchBar } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native-ui-lib';
import { CustomButton, ScreenLayout } from '../../../../components';
import { Colors, FontFamily, FontSize } from '../../../../configs';
import PestTable from './components/PestTable';
import { useGetAllPest } from '../../../../hooks';
import { handleAxiosErr } from '../../../../utils';
import { AdminHomeProps, Pest } from '../../../../types';

const PestData: React.FC<AdminHomeProps> = ({ navigation }) => {
    const mutationGetAllPest = useGetAllPest();
    const [pest, setPest] = React.useState<Pest[]>([]);
    const [search, setSearch] = React.useState<string>('');

    const updateSearch = (search: string) => {
        setSearch(search);
    };

    React.useEffect(() => {
        mutationGetAllPest.mutate(undefined, {
            onSuccess: resp => {
                setPest(resp.data.data);
            },
            onError: err => {
                handleAxiosErr(err);
            },
        });
    }, []);

    return (
        <ScreenLayout backgroundColor="light">
            <View style={{ gap: 26 }}>
                <SearchBar
                    placeholder="Cari hama"
                    onChangeText={updateSearch}
                    value={search}
                    platform="android"
                    containerStyle={{
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: Colors.secLigthTextColor,
                        borderRadius: 5,
                    }}
                    inputContainerStyle={{
                        backgroundColor: Colors.secLigthTextColor,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                    }}
                    inputStyle={{
                        color: Colors.darkTextColor,
                        fontFamily: FontFamily.poppinsRegular,
                        fontSize: FontSize.md,
                    }}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                    }}>
                    <CustomButton
                        text="+ Tambah Hama"
                        onPress={() => {
                            navigation.navigate('AdminAddPestScreen');
                        }}
                        type="primary"
                    />
                </View>
                <PestTable pest={pest} />
            </View>
        </ScreenLayout>
    );
};

export default PestData;
