import { SearchBar } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native-ui-lib';
import { ScreenLayout } from '../../../../components';
import { Colors, FontFamily, FontSize } from '../../../../configs';
import { useGetAllFarmers } from '../../../../hooks';
import { AdminHomeProps, Farmer } from '../../../../types';
import { handleAxiosErr } from '../../../../utils';
import FarmerTable from './components/FarmerTable';

const FarmerData: React.FC<AdminHomeProps> = ({ navigation }) => {
    const mutationGetAllFarmer = useGetAllFarmers();
    const [search, setSearch] = React.useState<string>('');
    const [farmer, setFarmer] = React.useState<Farmer[]>([]);

    const updateSearch = (search: string) => {
        setSearch(search);
    };

    React.useEffect(() => {
        mutationGetAllFarmer.mutate(undefined, {
            onSuccess: resp => {
                setFarmer(resp.data.data);
            },
            onError: err => {
                handleAxiosErr(err);
            },
        });
    }, []);

    return (
        <ScreenLayout backgroundColor="light">
            <View paddingT-20 paddingB-30>
                <SearchBar
                    placeholder="Cari pengguna"
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
            </View>
            <FarmerTable farmer={farmer} navigation={navigation} />
        </ScreenLayout>
    );
};

export default FarmerData;
