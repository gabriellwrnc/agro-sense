import { SearchBar } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native-ui-lib';
import {
    AdminCardData,
    CustomButton,
    ScreenLayout,
} from '../../../../components';
import { Colors, FontFamily, FontSize } from '../../../../configs';
import { useGetAllCase } from '../../../../hooks';
import { Case } from '../../../../types';
import { handleAxiosErr } from '../../../../utils';
import CaseTable from './components/CaseTable';

const CaseData: React.FC = () => {
    const mutationGetAllCase = useGetAllCase();
    const [cases, setCases] = React.useState<{
        unverifiedCaseCount: number;
        cases: Case[];
    }>({
        unverifiedCaseCount: 0,
        cases: [],
    });
    const [search, setSearch] = React.useState<string>('');

    const updateSearch = (search: string) => {
        setSearch(search);
    };

    React.useEffect(() => {
        mutationGetAllCase.mutate(undefined, {
            onSuccess: resp => {
                setCases(resp.data.data);
            },
            onError: err => {
                handleAxiosErr(err);
            },
        });
    }, []);

    return (
        <ScreenLayout backgroundColor="light">
            <View style={{ gap: 26 }}>
                <AdminCardData
                    onPress={() => {}}
                    title="Kasus Belum Diverifikasi"
                    totalData={cases.unverifiedCaseCount}
                />
                <SearchBar
                    placeholder="Cari kasus"
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
                        text="+ Tambah Kasus"
                        onPress={() => {
                            console.log('Tambah Kasus');
                        }}
                        type="primary"
                    />
                </View>
                <CaseTable cases={cases.cases} />
            </View>
        </ScreenLayout>
    );
};

export default CaseData;
